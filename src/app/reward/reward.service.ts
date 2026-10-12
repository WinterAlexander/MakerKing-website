import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { lastValueFrom } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({ providedIn: 'root' })
export class RewardService {

	constructor(private http: HttpClient) {}

	public claimReward(username: string, reward: string, key?: string): Promise<string> {
		if (key !== undefined) {
			return lastValueFrom(this.http.get(
				environment.server + '/claimreward?username=' +
				encodeURIComponent(username) + '&reward=' +
				encodeURIComponent(reward) + '&key=' +
				encodeURIComponent(key),
				{ responseType: 'text' }))
		}

		return lastValueFrom(this.http.get(
			environment.server + '/claimreward?username=' +
			encodeURIComponent(username) + '&reward=' +
			encodeURIComponent(reward),
			{ responseType: 'text' }))
	}
}
