import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { StatsService } from '../stats/stats.service'
import { EmbedPlayerSection } from './embed-player-section'
import { CheckboxSection } from './checkbox-section'
import { PlayerPreferenceSection } from './player-preference-section'
import { MusicOption } from './music-option'
import { HttpClient } from '@angular/common/http'

const WEBSOCKET_TIMEOUT = 5000 // 1 second

@Component({
	selector: 'app-music-player',
	templateUrl: './music-player.component.html',
	styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent implements OnInit {

	private startMessage: HTMLElement
	private startButton: HTMLElement
	private loadingMessage: HTMLElement
	private gameNotRunningMessage: HTMLElement
	private mainContainer: HTMLElement

	private levelInfoContainer: HTMLElement
	private notInALevel: HTMLElement
	private gameStateLine: HTMLElement

	private levelName: HTMLElement
	private levelAuthor: HTMLElement
	private trackName: HTMLElement
	private trackAuthor: HTMLElement

	private playerIconsLabel: HTMLElement
	private playerIconsContainer: HTMLElement
	private playerIcons: Map<string, HTMLElement> = new Map<string, HTMLElement>()

	private emptyMessage: HTMLElement

	private webSocket: WebSocket
	private lastReceived: Date

	private checkboxSection: CheckboxSection
	private dragger: PlayerPreferenceSection
	private player: EmbedPlayerSection

	private musicOptions: MusicOption[]
	private currentTrackName: string
	private currentTrackAuthor: string

	private inEditor = false

	constructor(private title: Title,
				private statsService: StatsService,
				private router: Router,
				private activatedRoute: ActivatedRoute,
				private readonly http: HttpClient) {
		this.webSocket = null
		this.lastReceived = null
	}


	ngOnInit(): void {
		this.title.setTitle('MakerKing - Music Player')

		this.startMessage = document.getElementById('start-message')
		this.startButton = document.getElementById('start-button')
		this.loadingMessage = document.getElementById('loading-message')
		this.gameNotRunningMessage = document.getElementById('gamenotrunning-message')
		this.mainContainer = document.getElementById('main-container')

		this.levelInfoContainer = document.getElementById('level-info-container')
		this.notInALevel = document.getElementById('not-in-a-level')
		this.gameStateLine = document.getElementById('game-state-line')

		this.levelName = document.getElementById('level-name')
		this.levelAuthor = document.getElementById('level-author')
		this.trackName = document.getElementById('track-name')
		this.trackAuthor = document.getElementById('track-author')

		this.playerIconsLabel = document.getElementById('available-on-label')
		this.playerIconsContainer = document.getElementById('player-icons-container')

		this.playerIcons.set('soundcloud', document.getElementById('player-icon-soundcloud'))
		this.playerIcons.set('bandcamp', document.getElementById('player-icon-bandcamp'))
		this.playerIcons.set('youtube', document.getElementById('player-icon-youtube'))

		this.emptyMessage = document.getElementById('empty-message')

		this.musicOptions = []

		this.checkboxSection = new CheckboxSection()
		this.dragger = new PlayerPreferenceSection(this.updateUI.bind(this))
		this.player = new EmbedPlayerSection(this, this.http)

		this.startButton.onclick = () => {
			setInterval(this.connect.bind(this), 500)
			this.startMessage.classList.add('hidden')
			this.loadingMessage.classList.remove('hidden')
		}
	}

	public setLevel(level: any): void {
		this.levelInfoContainer.classList.remove('hidden')
		this.notInALevel.classList.add('hidden')

		this.levelName.innerHTML = level.levelName
		this.levelAuthor.innerHTML = level.authorName

		this.currentTrackName = level.music.trackName
		this.currentTrackAuthor = level.music.trackAuthor
		this.trackName.innerHTML = level.music.trackName
		this.trackAuthor.innerHTML = level.music.trackAuthor

		this.musicOptions.length = 0

		if (level.music.type === 'external') {
			for (let i = 0; i < level.music.urls.length; i++) {
				const url = level.music.urls[i]
				this.musicOptions.push(new MusicOption(url.url, url.provider))
			}
		}

		this.updateUI()
	}

	public setState(state: string): void {
		this.levelInfoContainer.classList.add('hidden')
		this.notInALevel.classList.remove('hidden')
		this.gameStateLine.innerText = state
		this.player.updatePlayer(null)
	}

	private updateUI(): void {
		this.updateIcons()
		if (this.musicOptions.length === 0) {
			this.player.updatePlayer(null)
			return
		}

		const prefered = this.dragger.getPreferedOption(this.musicOptions)
		this.player.updatePlayer(prefered)
	}

	private updateIcons(): void {
		for (const provider of Array.from(this.playerIcons.keys())) {
			this.playerIcons.get(provider).classList.add('disabled')
			this.playerIcons.get(provider).classList.remove('selected')
		}

		if (this.musicOptions.length === 0) {
			this.emptyMessage.style.display = 'default'
			this.playerIconsLabel.innerText = ''
			return
		}

		this.playerIconsLabel.innerText = 'Available on:'
		this.emptyMessage.style.display = 'none'

		for (const option of this.musicOptions) {
			this.playerIcons.get(option.provider).classList.remove('disabled')
			if (option === this.dragger.getPreferedOption(this.musicOptions)) {
				this.playerIcons.get(option.provider).classList.add('selected')
			} else {
				this.playerIcons.get(option.provider).classList.remove('selected')
			}
		}
	}

	private connect(): void {
		if (this.webSocket != null) {

			if (this.lastReceived == null)
				return


			if (this.lastReceived.getTime() < new Date().getTime() - WEBSOCKET_TIMEOUT) {
				console.log('Timed out waiting for a response from client')
				this.webSocket = null
				this.gameNotRunningMessage.classList.remove('hidden')
				this.loadingMessage.classList.add('hidden')
				this.mainContainer.classList.add('hidden')
				this.player.updatePlayer(null)
			} else {
				this.webSocket.send('WebPlayer')
			}
			return
		}

		this.lastReceived = null
		this.webSocket = new WebSocket('ws://localhost:1770')

		this.webSocket.onerror = event => {
			this.webSocket = null
			this.gameNotRunningMessage.classList.remove('hidden')
			this.loadingMessage.classList.add('hidden')
			this.mainContainer.classList.add('hidden')
			this.player.updatePlayer(null)
		}

		this.webSocket.onopen = event => {
			this.webSocket.send('WebPlayer')
			this.mainContainer.classList.remove('hidden')
			this.loadingMessage.classList.add('hidden')
			this.gameNotRunningMessage.classList.add('hidden')
		}

		this.webSocket.onmessage = event => {
			const json = JSON.parse(event.data)
			const level = json.currentLevel || json.level

			if (json.eventType === undefined && this.lastReceived != null) {
				this.lastReceived = new Date()
				return
			}
			this.lastReceived = new Date()

			if (level === undefined || level === null) {
				switch (json.eventType) {
					case 'loading_level':
						this.setState('Loading level...')
						break

					case 'loading_game':
						this.setState('Game is loading...')
						break

					case 'entered_offline_menu':
					case 'logged_out':
					case 'game_open':
						this.setState('Offline - You need to login for music features')
						break

					case undefined:
						switch (json.currentScreen) {
							case 'TitleScreen':
							case 'OfflineMenuScreen':
								this.setState('Offline - You need to login for music features')
								break

							case 'AssetLoadingScreen':
								this.setState('Game is loading...')
								break

							case 'LoadingScreen':
								this.setState('Loading level...')
								break
						}
						break
				}
			} else {
				if (json.eventType === undefined) {
					this.inEditor = json.currentScreen === 'EditorScreen'
						|| json.currentScreen === 'PlayTestScreen'
				} else {
					this.inEditor = json.eventType === 'joined_editor'
						|| json.eventType === 'started_playtest'
				}

				this.setLevel(level)
			}
		}
	}


	public isAutoplay(): boolean {
		return this.checkboxSection.isAutoplay() && !this.inEditor
	}
}
