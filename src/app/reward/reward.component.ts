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
			url: 'farisun',
			name: 'Item pour les joueurs de FariSun',
			description: 'Voici un cosmétique spécialement pour vous, joueurs de FariSun.',
			items: [
				{ name: 'T-Shirt FariSun', image: '../assets/reward/farisun.png' }
			],
			needKey: false
		},
		{
			id: 'bluecoaster',
			url: 'bluecoaster',
			name: 'Item for Blue\'s fans',
			description: 'Wear this shirt to show your support for Blue!',
			items: [
				{ name: 'Blue\'s Shirt', image: '../assets/reward/bluecoaster.png' }
			],
			needKey: false
		},
		{
			id: 'akira',
			url: 'akira',
			name: 'Item for Akira\'s fans',
			description: 'Wear this shirt to show your support for Akira!',
			items: [
				{ name: 'Akira\'s Shirt', image: '../assets/reward/akira.png' }
			],
			needKey: false
		},
		{
			id: 'igl',
			url: 'igl',
			name: 'Item for IndieGameLover\'s fans',
			description: 'Wear this shirt to show your support for IndieGameLover!',
			items: [
				{ name: 'IndieGameLover\'s Shirt', image: '../assets/reward/indiegamelover.png' }
			],
			needKey: false
		},
		{
			id: 'artega',
			url: 'artega',
			name: 'Item for Artega Omega\'s fans',
			description: 'Wear this shirt to show your support for Artega Omega!',
			items: [
				{ name: 'Artega\'s Shirt', image: '../assets/reward/artega.png' }
			],
			needKey: false
		},
		{
			id: 'zsuat',
			url: 'tenekekafalar',
			name: 'Teneke Kafalar hayranları için eşya',
			description: 'Teneke Kafalar\'a olan desteğinizi göstermek için bu şapkayı takabilirsin!',
			items: [
				{ name: 'Teneke Kafalar\'ın şapkası', image: '../assets/reward/zsuat.png' }
			],
			needKey: false
		},
		{
			id: 'alienware',
			url: 'alienware',
			name: 'Alienware giveaway Skin',
			description: 'Exclusive skin for Alienware users and frisbee coins',
			items: [
				{ name: 'Alienware Skin', image: '../assets/reward/alienware.png' },
				{ name: '1000 frisbee coins', image: '../assets/reward/1000frisbeecoins.png' }
			],
			needKey: true
		},
		{
			id: 'intel',
			url: 'intel',
			name: 'Intel giveaway Skin',
			description: 'Exclusive skin for Intel users and frisbee coins',
			items: [
				{ name: 'Intel Skin', image: '../assets/reward/intel.png' },
				{ name: '1000 frisbee coins', image: '../assets/reward/1000frisbeecoins.png' }
			],
			needKey: true
		},
	];

	currentReward: Reward = undefined;
	response: string = undefined;

	formUsername: string;
	formKey?: string;

	constructor(private title: Title,
				private activatedRoute: ActivatedRoute,
				private router: Router,
				private rewardService: RewardService) {}

	ngOnInit() {
		this.activatedRoute.queryParams.subscribe(params => {
			const rewardId = params['id'];
			const reward = this.rewards.find(r => r.url === rewardId);

			if (reward === undefined) {
				this.router.navigate(['/']);
				return;
			}

			this.currentReward = reward;
			this.title.setTitle('MakerKing - ' + reward.name);
		});
	}

	claimReward() {
		this.rewardService.claimReward(this.formUsername, this.currentReward.id, this.formKey).then(res => {
			this.response = 'You successfully obtained the reward! Logout and login again to refresh your in-game inventory.';
			// this.response = "Vous avez obtenu la récompense! Déconnectez et reconnectez vous du jeu pour mettre à jour votre inventaire."
		}).catch(error => {
			switch (error.error) {
				case 'reward_not_found':
					this.response = 'This reward is not out yet! Please wait for the 0.9 update.';
					break;

				case 'reward_already_claimed':
					this.response = 'You have already claimed this reward.';
					// this.response = "Vous avez déjà réclamé cette récompense.";
					break;

				case 'user_not_found':
					this.response = 'This username could not be found. Make sure you entered it correctly.';
					// this.response = "Ce pseudonyme n'a pas pu être trouvé, assurez vous de l'avoir entré correctement.";
					break;

				case 'invalid_key':
					this.response = 'Provided key is invalid. Make sure you entered it correctly.';
					break;

				case 'require_no_key':
				case 'require_key':
					this.response = 'Internal error, please contact an administrator.';
					break;

				default:
					this.response = error.error;
			}
		});
	}
}
