import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { GlobalLeaderboardEntry } from '../leaderboard/globalleaderboardentry'
import { GlobalPlayerStats } from './globalplayerstats'
import { OnlinePlayer } from './onlineplayer'
import { Level } from '../level/level'
import { PlayerStats } from '../user/playerstats'
import { LevelLeaderboardEntry } from '../level/levelleaderboardentry'

@Injectable()
export class StatsService {
	constructor(private http: HttpClient) {}

	public getGlobalPlayerStats(): Promise<GlobalPlayerStats> {
		return this.http.get(environment.server + '/serverstats').toPromise()
			.then((response: any) => {
				return response
			})
	}

	public getPlayerList(): Promise<OnlinePlayer[]> {
		return this.http.get(environment.server + '/playerlist').toPromise().then((response: any) => {
			return response
		})
	}

	public getLeaderboard(startIndex: number, count: number): Promise<GlobalLeaderboardEntry[]> {
		return this.http.get(environment.server + '/leaderboard' +
			'?startIndex=' + startIndex +
			'&count=' + count).toPromise()
			.then((response: any) => {
				return response
			})
	}

	public getLevelLeaderboard(levelId: number, startIndex: number, count: number): Promise<LevelLeaderboardEntry[]> {
		return this.http.get(environment.server + '/leaderboard/level' +
			'?id=' + levelId +
			'&startIndex=' + startIndex +
			'&count=' + count).toPromise()
			.then((response: any) => {
				return response
			})
	}

	public getLevelDetails(levelId: number): Promise<Level> {
		return this.http.get(environment.server + '/leveldetails' +
			'?id=' + levelId).toPromise().then((response: any) => {
				return response
			})
	}

	public getPlayerStats(userId: number): Promise<PlayerStats> {
		return this.http.get(environment.server + '/playerdetails' +
			'?id=' + userId).toPromise().then((response: any) => {
				return response
			})
	}
}
