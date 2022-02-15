import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Level } from './level';
import { StatsService } from '../stats/stats.service';
import { LevelLeaderboardEntry } from './levelleaderboardentry';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AccountService } from '../user/account.service';

const PAGE_SIZE = 25;

@Component({
	selector: 'app-level',
	templateUrl: './level.component.html',
	styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {

	private levelId = -1;

	private page = 0;
	private end = false;

	public level: Level = null;
	public entries: LevelLeaderboardEntry[] = null;


	constructor(private title: Title,
				private router: Router,
				private statsService: StatsService,
				private activatedRoute: ActivatedRoute,
				public accountService: AccountService) {}


	ngOnInit() {
		this.title.setTitle('MakerKing');

		this.activatedRoute.queryParams.subscribe(params => {
			if (params['id'] !== undefined && !isNaN(+params['id'])) {
				this.levelId = params['id'];
			}

			if (params['page'] !== undefined && !isNaN(+params['page'])) {
				this.page = params['page'] - 1;
			}

			if (params['end'] !== undefined) {
				this.end = params['end'];
			}

			this.statsService.getLevelDetails(this.levelId).then(
				level => {
					this.level = level;
					this.title.setTitle(level.levelName + ' by ' + level.ownerName + ' - MakerKing');
				}
			).catch(e => {
				this.router.navigateByUrl('/');
			});

			this.statsService.getLevelLeaderboard(this.levelId, PAGE_SIZE * this.page, PAGE_SIZE).then(
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

	public displayTime(entry: LevelLeaderboardEntry) {

		const millis = Math.round((entry.tickLength * 1000 - entry.subFrame * 1000) / 60);

		const sec = Math.floor(millis / 1000);
		const leftMillis = ('000' + millis % 1000).slice(-3);

		const minutes = Math.floor(sec / 60);
		const leftSec = ('00' + sec % 60).slice(-2);

		const hours = Math.floor(minutes / 60);
		const leftMinutes = ('00' + minutes % 60).slice(-2);

		return (hours < 10 ? '0' : '') + hours + ':' + leftMinutes + ':' + leftSec + '.' + leftMillis;
	}
}
