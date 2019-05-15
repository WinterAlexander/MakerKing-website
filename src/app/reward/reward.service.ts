import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class RewardService {

	constructor(private http: HttpClient) {}

	public claimReward(username: string, reward: string) : Promise<void> {
		return this.http.get<void>(
			"http://jumpai.net:8000/claimreward?username=" + username + "&reward=" + reward).toPromise();
	}
}