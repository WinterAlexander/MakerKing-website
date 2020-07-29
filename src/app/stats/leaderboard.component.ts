import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {StatsService} from './stats.service';
import {LeaderboardEntry} from './leaderboardentry';
import {UserService} from '../user/user.service';

const PAGE_SIZE = 25;

@Component({
	selector: 'app-leaderboard',
	templateUrl: './leaderboard.component.html',
	styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

	private page = 0;
	private end = false;

	public entries: LeaderboardEntry[] = null;

	constructor(private title: Title,
			private statsService: StatsService,
			private router: Router,
			private activatedRoute: ActivatedRoute,
			public userService: UserService) {}


	ngOnInit() {
		this.title.setTitle('Jumpaï - Leaderboard');

		this.activatedRoute.queryParams.subscribe(params => {
			if (params['page'] !== undefined) {
				this.page = params['page'] - 1;
			}

			if (params['end'] !== undefined) {
				this.end = params['end'];
			}

			this.title.setTitle('Jumpaï - Leaderboard' + (this.getPageNumber() === 1 ? '' : ' Page ' + this.getPageNumber()));

			this.statsService.getLeaderboard(PAGE_SIZE * this.page, PAGE_SIZE).then(
				entries => {
					this.entries = entries;
					if (entries.length === 0) {
						if (this.end) {
							this.page = 0;
							this.end = false;
						} else {
							this.page--;
							this.end = true;
						}

						this.reloadBoard();
					} else if (entries.length < PAGE_SIZE) {
						this.end = true;
					}
				}
			);
		});
	}

	private reloadBoard() {
		this.title.setTitle('Jumpaï - Leaderboard Page ' + this.getPageNumber());
		const queryParams: Params = { page: this.getPageNumber(), end: this.end ? true : null };

		this.router.navigate(
			[],
			{
				relativeTo: this.activatedRoute,
				queryParams: queryParams,
				queryParamsHandling: 'merge', // remove to replace all query params by provided
			});
	}

	public prevPage() {
		if (this.entries == null) {
			return;
		}

		this.page--;

		if (this.page < 0) {
			this.page = 0;
		} else {
			this.reloadBoard();
		}
	}

	public nextPage() {
		if (this.entries == null || this.end) {
			return;
		}

		this.page++;
		this.reloadBoard();
	}

	public getPageNumber() {
		return this.page + 1;
	}

	public isLastPage() {
		return this.end;
	}
}
