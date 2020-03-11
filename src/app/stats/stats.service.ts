import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class StatsService {
	constructor(private http: HttpClient) {}

	public getPlayersOnline(): Promise<number> {
		return this.http.get(environment.server + '/playersonline').toPromise()
			.then((response: any) => {
				return response;
			});
	}
}
