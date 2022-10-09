import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {StatsService} from '../stats/stats.service';
import {AccountService} from '../user/account.service';


@Component({
	selector: 'app-leaderboard',
	templateUrl: './music-player.component.html',
	styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent implements OnInit {


	constructor(private title: Title,
			private statsService: StatsService,
			private router: Router,
			private activatedRoute: ActivatedRoute,
			public accountService: AccountService) {}


	ngOnInit() {
		this.title.setTitle('MakerKing - Music Player');

	}

	isAutoplay() {
		return false;
	}
}
