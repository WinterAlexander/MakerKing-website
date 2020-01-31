import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { StatsService } from '../stats/stats.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	playersOnline: number = null;
	inputUsername: string;
	inputPassword: string;
	loginReady = false;
	error = false;
	loggingIn = false;

	constructor(private userService: UserService,
					private statsService: StatsService) {}

	ngOnInit(): void {
		this.userService.validateToken().then(valid => this.loginReady = true);

		this.statsService.getPlayersOnline().then(num => this.playersOnline = num);
	}

	private login(): void {
		if (this.loggingIn) {
			return;
		}

		this.loggingIn = true;
		this.userService.login(this.inputUsername, this.inputPassword).then(successful => {
			this.loggingIn = false;
			if (successful) {
				this.inputUsername = '';
				this.inputPassword = '';
				this.error = false;
			} else {
				this.error = true;
			}
		});
	}

	private keytab(event): void {
		const element = event.srcElement.nextElementSibling; // get the sibling element

		if (element == null) {
			return;
		} else {
			element.focus();
		}
	}
}
