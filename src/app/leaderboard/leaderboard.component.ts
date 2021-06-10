import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {StatsService} from '../stats/stats.service';
import {GlobalLeaderboardEntry} from './globalleaderboardentry';
import {AccountService} from '../user/account.service';

const PAGE_SIZE = 25;

@Component({
	selector: 'app-leaderboard',
	templateUrl: './leaderboard.component.html',
	styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

	private page = 0;
	private end = false;

	public entries: GlobalLeaderboardEntry[] = null;

	constructor(private title: Title,
			private statsService: StatsService,
			private router: Router,
			private activatedRoute: ActivatedRoute,
			public accountService: AccountService) {}


	ngOnInit() {
		this.title.setTitle('MakerKing - Leaderboard');

		this.activatedRoute.queryParams.subscribe(params => {
			if (params['page'] !== undefined && !isNaN(+params['page'])) {
				this.page = params['page'] - 1;
			}

			if (params['end'] !== undefined) {
				this.end = params['end'];
			}

			this.title.setTitle('MakerKing - Leaderboard' + (this.getPageNumber() === 1 ? '' : ' Page ' + this.getPageNumber()));

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
		this.title.setTitle('MakerKing - Leaderboard Page ' + this.getPageNumber());
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
		this.end = false;

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
