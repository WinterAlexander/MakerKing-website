import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
	constructor(private http: HttpClient) {}

	public login(username: string, password: string): Promise<boolean> {
		this.logout();

		let params = new HttpParams();
		params = params.append('username', username);
		params = params.append('password', password);

		return this.http.post(environment.server + 'login', params).toPromise()
			.then((response: any) => {
				if (response.status === 200) {
					localStorage.setItem('token', response.json().token);
					localStorage.setItem('username', response.json().username);
					localStorage.setItem('userId', response.json().userId);

					return Promise.resolve(true);
				}
				return Promise.resolve(false);
			}).catch((e: any) => {
				console.log(e);
				return Promise.resolve(false);
			});
	}

	/**
	 * Checks if the stored token is valid, logging out if not
	 */
	public validateToken(): Promise<boolean> {
		if (!this.isLogged()) {
			this.logout();
			return Promise.resolve(false);
		}

		let params = new HttpParams();
		params = params.append('token', localStorage.getItem('token'));
		params = params.append('username', localStorage.getItem('username'));
		params = params.append('userId', localStorage.getItem('userId'));

		return this.http.post(environment.server + 'validateToken', params).toPromise()
			.then((response: any) => {
				return Promise.resolve(response.status === 200);
			}).catch((e: any) => {
				console.log(e);
				return Promise.resolve(false);
			});
	}

	public logout(): void {
		localStorage.removeItem('token');
		localStorage.removeItem('username');
		localStorage.removeItem('userId');
	}

	public isLogged(): boolean {
		return localStorage.getItem('token') !== undefined &&
			localStorage.getItem('username') !== undefined &&
			localStorage.getItem('userId') !== undefined;
	}
}
