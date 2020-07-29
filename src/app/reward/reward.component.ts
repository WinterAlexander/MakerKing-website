import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Reward} from './reward';
import {ActivatedRoute, Router} from '@angular/router';
import {RewardService} from './reward.service';

@Component({
	selector: 'app-reward',
	templateUrl: './reward.component.html',
	styleUrls: ['./reward.component.css']
})
export class RewardComponent implements OnInit {
	rewards: Reward[] = [
		{
			id: 'farisun',
			name: 'Item pour les joueurs de FariSun',
			description: 'Voici un cosmétique spécialement pour vous, joueurs de FariSun.',
			items: [
				{ name: 'T-Shirt FariSun', image: '../assets/reward/farisun.png' }
			]
		},
		{
			id: 'bluecoaster',
			name: 'Item for Blue\'s fans',
			description: 'Wear this shirt to show your support for Blue!',
			items: [
				{ name: 'Blue\'s Shirt', image: '../assets/reward/bluecoaster.png' }
			]
		},
		{
			id: 'akira',
			name: 'Item for Akira\'s fans',
			description: 'Wear this shirt to show your support for Akira!',
			items: [
				{ name: 'Akira\'s Shirt', image: '../assets/reward/akira.png' }
			]
		}
	];

	currentReward: Reward = undefined;
	response: string = undefined;

	formUsername: string;

	constructor(private title: Title,
				private activatedRoute: ActivatedRoute,
				private router: Router,
				private rewardService: RewardService) {}

	ngOnInit() {
		this.activatedRoute.queryParams.subscribe(params => {
			const rewardId = params['id'];
			const reward = this.rewards.find(r => r.id === rewardId);

			if (reward === undefined) {
				this.router.navigate(['/']);
				return;
			}

			this.currentReward = reward;
			this.title.setTitle('Jumpaï - ' + reward.name);
		});
	}

	claimReward() {
		this.rewardService.claimReward(this.formUsername, this.currentReward.id).then(res => {
			this.response = 'You successfully obtained the reward! Logout and login again to refresh your in-game inventory.';
			// this.response = "Vous avez obtenu la récompense! Déconnectez et reconnectez vous du jeu pour mettre à jour votre inventaire."
		}).catch(error => {
			switch (error.error) {
				case 'reward_already_claimed':
					this.response = 'You have already claimed this reward.';
					// this.response = "Vous avez déjà réclamé cette récompense.";
					break;

				case 'user_not_found':
					this.response = 'This username could not be found. Make sure you entered it correctly.';
					// this.response = "Ce pseudonyme n'a pas pu être trouvé, assurez vous de l'avoir entré correctement.";
					break;

				default:
					this.response = error.error;
			}
		});
	}
}
