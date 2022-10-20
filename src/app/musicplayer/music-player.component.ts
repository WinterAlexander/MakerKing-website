import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StatsService } from '../stats/stats.service';
import { AccountService } from '../user/account.service';
import { EmbedPlayerSection } from './EmbedPlayerSection';
import { CheckboxSection } from './CheckboxSection';
import { PlayerPreferenceSection } from './PlayerPreferenceSection';
import { MusicOption } from './MusicOption';
import { HttpClient } from '@angular/common/http';


@Component({
	selector: 'app-music-player',
	templateUrl: './music-player.component.html',
	styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent implements OnInit {

	private loadingMessage: HTMLElement;
	private gameNotRunningMessage: HTMLElement;
	private playerContainer: HTMLElement;

	private levelInfoContainer: HTMLElement;
	private notInALevel: HTMLElement;
	private gameStateLine: HTMLElement;

	private levelName: HTMLElement;
	private levelAuthor: HTMLElement;
	private trackName: HTMLElement;
	private trackAuthor: HTMLElement;

	private playerIconsLabel: HTMLElement;
	private playerIconsContainer: HTMLElement;
	private playerIcons: Map<string, HTMLElement> = new Map<string, HTMLElement>();

	private emptyMessage: HTMLElement;

	private webSocket: WebSocket;

	private checkboxSection: CheckboxSection;
	private dragger: PlayerPreferenceSection;
	private player: EmbedPlayerSection;

	private musicOptions: MusicOption[];
	private currentTrackName: string;
	private currentTrackAuthor: string;

	private inEditor = false;


	constructor(private title: Title,
				private statsService: StatsService,
				private router: Router,
				private activatedRoute: ActivatedRoute,
				public accountService: AccountService,
				private readonly http: HttpClient) {
	}


	ngOnInit(): void {
		this.title.setTitle('MakerKing - Music Player');

		this.loadingMessage = document.getElementById('loading-message');
		this.gameNotRunningMessage = document.getElementById('gamenotrunning-message');
		this.playerContainer = document.getElementById('player-container');

		this.levelInfoContainer = document.getElementById('level-info-container');
		this.notInALevel = document.getElementById('not-in-a-level');
		this.gameStateLine = document.getElementById('game-state-line');

		this.levelName = document.getElementById('level-name');
		this.levelAuthor = document.getElementById('level-author');
		this.trackName = document.getElementById('track-name');
		this.trackAuthor = document.getElementById('track-author');

		this.playerIconsLabel = document.getElementById('available-on-label');
		this.playerIconsContainer = document.getElementById('player-icons-container');

		this.playerIcons['soundcloud'] = document.getElementById('player-icon-soundcloud');
		this.playerIcons['bandcamp'] = document.getElementById('player-icon-bandcamp');
		this.playerIcons['youtube'] = document.getElementById('player-icon-youtube');

		this.emptyMessage = document.getElementById('empty-message');

		this.musicOptions = [];

		this.checkboxSection = new CheckboxSection();
		this.dragger = new PlayerPreferenceSection(this.updateUI.bind(this));
		this.player = new EmbedPlayerSection(this, this.http);

		this.connect();
	}

	public setLevel(level: any): void {
		this.levelInfoContainer.classList.remove('hidden');
		this.notInALevel.classList.add('hidden');

		this.levelName.innerHTML = level.levelName;
		this.levelAuthor.innerHTML = level.authorName;

		this.currentTrackName = level.music.trackName;
		this.currentTrackAuthor = level.music.trackAuthor;
		this.trackName.innerHTML = level.music.trackName;
		this.trackAuthor.innerHTML = level.music.trackAuthor;

		this.musicOptions.length = 0;

		if (level.music.type === 'external') {
			for (let i = 0; i < level.music.urls.length; i++) {
				const url = level.music.urls[i];
				this.musicOptions.push(new MusicOption(url.url, url.provider));
			}
		}

		this.updateUI();
	}

	public setState(state: string): void {
		this.levelInfoContainer.classList.add('hidden');
		this.notInALevel.classList.remove('hidden');
		this.gameStateLine.innerText = state;
		this.player.updatePlayer(null);
	}

	private updateUI(): void {
		this.updateIcons();
		if (this.musicOptions.length === 0) {
			this.player.updatePlayer(null);
			return;
		}

		const prefered = this.dragger.getPreferedOption(this.musicOptions);
		this.player.updatePlayer(prefered);
	}

	private updateIcons(): void {
		for (const provider of Array.from(this.playerIcons.keys())) {
			this.playerIcons[provider].classList.add('disabled');
			this.playerIcons[provider].classList.remove('selected');
		}

		if (this.musicOptions.length === 0) {
			this.emptyMessage.style.display = 'default';
			this.playerIconsLabel.innerText = '';
			return;
		}

		this.playerIconsLabel.innerText = 'Available on:';
		this.emptyMessage.style.display = 'none';

		for (const option of this.musicOptions) {
			this.playerIcons[option.provider].classList.remove('disabled');
			if (option === this.dragger.getPreferedOption(this.musicOptions)) {
				this.playerIcons[option.provider].classList.add('selected');
			} else {
				this.playerIcons[option.provider].classList.remove('selected');
			}
		}
	}

	public connect(): void {
		this.webSocket = new WebSocket('ws://localhost:1770');

		this.webSocket.onerror = event => {
			this.gameNotRunningMessage.classList.remove('hidden');
			this.loadingMessage.classList.add('hidden');
			setInterval(this.connect.bind(this), 1000);
		};

		this.webSocket.onopen = event => {
			this.webSocket.send('WebPlayer');
			this.playerContainer.classList.remove('hidden');
			this.loadingMessage.classList.add('hidden');
		};

		this.webSocket.onmessage = event => {
			const json = JSON.parse(event.data);
			const level = json.currentLevel || json.level;

			if (level === undefined || level === null) {
				switch (json.eventType) {
					case 'loading_level':
						this.setState('Loading level...');
						break;

					case 'loading_game':
						this.setState('Game is loading...');
						break;

					case 'entered_offline_menu':
					case 'logged_out':
					case 'game_open':
						this.setState('Offline - You need to login for music features');
						break;

					case undefined:
						switch (json.currentScreen) {
							case 'TitleScreen':
							case 'OfflineMenuScreen':
								this.setState('Offline - You need to login for music features');
								break;

							case 'AssetLoadingScreen':
								this.setState('Game is loading...');
								break;

							case 'LoadingScreen':
								this.setState('Loading level...');
								break;
						}
						break;
				}
			} else {
				if (json.eventType === undefined) {
					this.inEditor = json.currentScreen === 'EditorScreen'
						|| json.currentScreen === 'PlayTestScreen';
				} else {
					this.inEditor = json.eventType === 'joined_editor'
						|| json.eventType === 'started_playtest';
				}

				this.setLevel(level);
			}
		};
	}


	public isAutoplay(): boolean {
		return this.checkboxSection.isAutoplay() && !this.inEditor;
	}
}
