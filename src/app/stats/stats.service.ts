import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { lastValueFrom } from 'rxjs'
import { environment } from '../../environments/environment'
import { GlobalLeaderboardEntry } from '../leaderboard/globalleaderboardentry'
import { GlobalPlayerStats } from './globalplayerstats'
import { OnlinePlayer } from './onlineplayer'
import { Level } from '../level/level'
import { PlayerStats } from '../user/playerstats'
import { LevelLeaderboardEntry } from '../level/levelleaderboardentry'

@Injectable({ providedIn: 'root' })
export class StatsService {
	constructor(private http: HttpClient) {}

	public getGlobalPlayerStats(): Promise<GlobalPlayerStats> {
		return lastValueFrom(this.http.get(environment.server + '/serverstats'))
			.then((response: any) => {
				return response
			})
	}

	public getPlayerList(): Promise<OnlinePlayer[]> {
		return lastValueFrom(this.http.get(environment.server + '/playerlist')).then((response: any) => {
			return response
		})
	}

	public getLeaderboard(startIndex: number, count: number): Promise<GlobalLeaderboardEntry[]> {
		return lastValueFrom(this.http.get(environment.server + '/leaderboard' +
			'?startIndex=' + startIndex +
			'&count=' + count))
			.then((response: any) => {
				return response
			})
	}

	public getLevelLeaderboard(levelId: number, startIndex: number, count: number): Promise<LevelLeaderboardEntry[]> {
		return lastValueFrom(this.http.get(environment.server + '/leaderboard/level' +
			'?id=' + levelId +
			'&startIndex=' + startIndex +
			'&count=' + count))
			.then((response: any) => {
				return response
			})
	}

	public getLevelDetails(levelId: number): Promise<Level> {
		return lastValueFrom(this.http.get(environment.server + '/leveldetails' +
			'?id=' + levelId)).then((response: any) => {
				return response
			})
	}

	public getPlayerStats(userId: number): Promise<PlayerStats> {
		return lastValueFrom(this.http.get(environment.server + '/playerdetails' +
			'?id=' + userId)).then((response: any) => {
				return response
			})
	}
}
