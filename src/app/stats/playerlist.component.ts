import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {StatsService} from './stats.service';
import {GlobalLeaderboardEntry} from '../leaderboard/globalleaderboardentry';
import {AccountService} from '../user/account.service';
import { OnlinePlayer } from './onlineplayer';

@Component({
	selector: 'app-playerlist',
	templateUrl: './playerlist.component.html',
	styleUrls: ['./playerlist.component.css']
})
export class PlayerListComponent implements OnInit {
	public players: OnlinePlayer[] = null;

	constructor(private title: Title,
				private statsService: StatsService) {}


	ngOnInit() {
		this.title.setTitle('MakerKing - Online players');

		this.statsService.getPlayerList().then(players => {
				this.players = players;
			}
		);
	}
}
