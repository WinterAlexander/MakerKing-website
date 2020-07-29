import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {StatsService} from './stats.service';

@Component({
	selector: 'app-leaderboard',
	templateUrl: './leaderboard.component.html',
	styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
	constructor(private title: Title,
				private activatedRoute: ActivatedRoute,
				private router: Router,
				private statsService: StatsService) {}

	ngOnInit() {
		this.title.setTitle('Jumpaï - Leaderboard');
	}
}
