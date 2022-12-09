import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { StatsService } from '../stats/stats.service'
import { PlayerStats } from './playerstats'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
	selector: 'app-player',
	templateUrl: './player.component.html',
	styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

	private userId = -1

	public stats: PlayerStats = null

	constructor(private title: Title,
				private router: Router,
				private statsService: StatsService,
				private activatedRoute: ActivatedRoute) {}


	ngOnInit() {
		this.title.setTitle('MakerKing')


		this.activatedRoute.queryParams.subscribe(params => {
			if (params['id'] !== undefined && !isNaN(+params['id'])) {
				this.userId = params['id']
			}

			this.statsService.getPlayerStats(this.userId).then(
				stats => {
					this.stats = stats
					this.title.setTitle(stats.playerName + ' - MakerKing')
				}
			).catch(e => {
				this.router.navigateByUrl('/')
			})
		})
	}
}
