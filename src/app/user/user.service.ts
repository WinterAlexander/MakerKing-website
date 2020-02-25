import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
	constructor(private http: HttpClient) {}

	public login(username: string, password: string): Promise<void> {
		this.logout();

		let params = new HttpParams();
		params = params.append('username', username);
		params = params.append('password', password);

		return this.http.post(environment.server + '/login', params).toPromise()
			.then((response: any) => {
				localStorage.setItem('token', response.token);
				localStorage.setItem('username', response.username);
				localStorage.setItem('userId', response.userId);
				return Promise.resolve();
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

		return this.http.post(environment.server + '/validatetoken', params).toPromise()
			.then((response: any) => {
				return Promise.resolve(true);
			}).catch((e: any) => {
				this.logout();
				return Promise.resolve(false);
			});
	}

	public logout(): void {
		localStorage.removeItem('token');
		localStorage.removeItem('username');
		localStorage.removeItem('userId');
	}

	public isLogged(): boolean {
		return localStorage.getItem('token') != null &&
			localStorage.getItem('username') != null &&
			localStorage.getItem('userId') != null;
	}

	public getUsername(): string {
		return localStorage.getItem('username');
	}

	public getUserId(): string {
		return localStorage.getItem('userId');
	}

	public getToken(): string {
		return localStorage.getItem('token');
	}
}
