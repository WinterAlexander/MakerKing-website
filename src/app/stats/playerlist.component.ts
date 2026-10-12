import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import {Title} from '@angular/platform-browser'
import {StatsService} from './stats.service'
import { OnlinePlayer } from './onlineplayer'

@Component({
	selector: 'app-playerlist',
	templateUrl: './playerlist.component.html',
	changeDetection: ChangeDetectionStrategy.Eager,
	styleUrls: ['./playerlist.component.css']
})
export class PlayerListComponent implements OnInit {
	public players: OnlinePlayer[] = null

	constructor(private title: Title,
				private statsService: StatsService) {}


	ngOnInit() {
		this.title.setTitle('MakerKing - Online players')

		this.statsService.getPlayerList().then(players => {
				this.players = players
			}
		)
	}
}
