import { Component } from "@angular/core";
import { DISCORD_ADDRESS, TWITTER_ADDRESS, REDDIT_ADDRESS, FACEBOOK_ADDRESS } from "../social-constants";

@Component({
    selector: 'footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {
    currentYear: string = new Date().getFullYear() + "";
	twitterAddress: string = TWITTER_ADDRESS;
	discordAddress: string = DISCORD_ADDRESS;
	redditAddress: string = REDDIT_ADDRESS;
	facebookAddress: string = FACEBOOK_ADDRESS;
}
