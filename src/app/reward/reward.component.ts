import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Reward} from './reward';
import {ActivatedRoute, Router} from '@angular/router';
import {RewardService} from './reward.service';

@Component({
	selector: 'reward',
	templateUrl: './reward.component.html',
	styleUrls: ['./reward.component.css']
})
export class RewardComponent implements OnInit {

	rewards: Reward[] = [
		{
			id: "farisun",
			name: "Item pour les joueurs de FariSun",
			description: "Voici un cosmétique spécialement pour vous, joueurs de FariSun.",
			items: [
				{ name: "T-Shirt FariSun", image: "../assets/reward/farisun.png" }
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
			const rewardId = params["id"];
			const reward = this.rewards.find(r => r.id == rewardId);

			if(reward === undefined) {
				this.router.navigate(["/"]);
				return;
			}

			this.currentReward = reward;
			this.title.setTitle("Jumpaï - " + reward.name);
		});
	}

	claimReward() {
		this.rewardService.claimReward(this.formUsername, this.currentReward.id).then(v => {
			this.response = "It worked!";
		}).catch(error => {
			this.response = error;
		});
	}
}
