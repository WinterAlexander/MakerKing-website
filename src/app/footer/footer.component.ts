import { Component } from "@angular/core";

@Component({
    selector: 'footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {
    currentYear: string = new Date().getFullYear() + "";
	twitterAddress: string = "https://twitter.com/jumpaigame";
	discordAddress: string = "https://discord.gg/r3v3WPM";
	redditAddress: string = "https://www.reddit.com/r/jumpai/";
}
