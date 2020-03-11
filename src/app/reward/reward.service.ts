import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class RewardService {

	constructor(private http: HttpClient) {}

	public claimReward(username: string, reward: string): Promise<string> {
		return this.http.get(
			environment.server + '/claimreward?username=' +
			encodeURIComponent(username) + '&reward=' +
			encodeURIComponent(reward),
			{ responseType: 'text' }).toPromise();
	}
}
