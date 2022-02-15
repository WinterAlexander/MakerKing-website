import { Component, OnInit } from '@angular/core';
import { AccountService } from '../user/account.service';
import { StatsService } from '../stats/stats.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	playersOnline: number = null;
	playersRegistered: number = null;
	inputUsername: string;
	inputPassword: string;
	loginReady = false;
	error = false;
	invalidLogin = false;
	loggingIn = false;

	constructor(private userService: AccountService,
					private statsService: StatsService) {}

	ngOnInit(): void {
		this.userService.validateToken().then(() => this.loginReady = true);

		this.statsService.getGlobalPlayerStats()
			.then(json => {
				this.playersOnline = json.onlinePlayers;
				this.playersRegistered = json.registeredPlayers;
			})
			.catch(err => {
				this.playersOnline = null;
				this.playersRegistered = null;
				console.log(err);
			});
	}

	private login(): void {
		if (this.loggingIn) {
			return;
		}

		this.loggingIn = true;
		this.userService.login(this.inputUsername, this.inputPassword).then(() => {
			this.loggingIn = false;
			this.inputUsername = '';
			this.inputPassword = '';
			this.error = false;
		}).catch(errorResponse => {
			this.loggingIn = false;
			this.error = true;
			this.invalidLogin = errorResponse.status === 400;
		});
	}

	private keytab(event): void {
		const element = event.srcElement.nextElementSibling; // get the sibling element

		if (element != null) {
			element.focus();
		}
	}
}
