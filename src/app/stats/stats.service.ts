import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LeaderboardEntry } from './leaderboardentry';
import { GlobalPlayerStats } from './globalplayerstats';
import { OnlinePlayer } from './onlineplayer';

@Injectable()
export class StatsService {
	constructor(private http: HttpClient) {}

	public getGlobalPlayerStats(): Promise<GlobalPlayerStats> {
		return this.http.get(environment.server + '/globalplayerstats').toPromise()
			.then((response: any) => {
				return response;
			});
	}

	public getPlayerList(): Promise<OnlinePlayer[]> {
		return this.http.get(environment.server + '/playerlist').toPromise().then((response: any) => {
			return response;
		});
	}

	public getLeaderboard(startIndex: number, count: number): Promise<LeaderboardEntry[]> {
		return this.http.get(environment.server + '/leaderboard' +
			'?startIndex=' + startIndex +
			'&count=' + count).toPromise()
			.then((response: any) => {
				return response;
			});
	}
}
