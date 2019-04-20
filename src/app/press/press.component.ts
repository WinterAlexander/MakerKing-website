import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {
	DISCORD_ADDRESS, TWITTER_ADDRESS, EMAIL_ADDRESS, FACEBOOK_ADDRESS, REDDIT_ADDRESS,
	YOUTUBE_ADDRESS, ITCHIO_ADDRESS
} from '../social-constants';

@Component({
    selector: 'press',
    templateUrl: './press.component.html',
    styleUrls: ['./press.component.css']
})
export class PressComponent implements OnInit {
    twitterAddress: string = TWITTER_ADDRESS;
    discordAddress: string = DISCORD_ADDRESS;
    facebookAddress: string = FACEBOOK_ADDRESS;
    emailAddress: string = EMAIL_ADDRESS;
	redditAddress: string = REDDIT_ADDRESS;
	youtubeAddress: string = YOUTUBE_ADDRESS;
	itchAddress: string = ITCHIO_ADDRESS;

	screenshotPackage: string = "https://drive.google.com/open?id=1ufUaSsSVt4VXemVhjY1CPsKFHi4mQdDx";
	gifPackage: string = "https://drive.google.com/open?id=1SjPtDbsAk9cpfjrpzn55yQIHMnKQAERJ";
	logoPackage: string = "https://drive.google.com/open?id=1jUysbP-jTqk7RTF9Fmf9zkXfl43oMvCC";

	screenshots: string[] = [
		"assets/press/screenshots/chicken_race.png",
		"assets/press/screenshots/cool_editing.png",
		"assets/press/screenshots/cool_level.png",
		"assets/press/screenshots/crazy_level.png",
		"assets/press/screenshots/social_umbrellas.png",
		"assets/press/screenshots/title.png",
		"assets/press/screenshots/biome_editor.png",
		"assets/press/screenshots/biome_transition.png"
	];

	gifs: string[] = [
		"UnpleasantImmenseAdeliepenguin",
		"NiceUnselfishBunting",
		"ImprobableQuaintHuemul",
		"DisfiguredUncommonGrizzlybear",
		"UnconsciousApprehensiveGonolek",
		"WeirdRealBadger",
		"GlossyUnequaledDrongo",
		"SpryWhichCoyote"
	];
    
    constructor(private title: Title) {}

    ngOnInit() {
        this.title.setTitle('Jumpaï Press Kit');
    }

	nameOf(screenshot: string): string {
		return screenshot.split('/').pop().replace('_', ' ').replace('.png', '').replace(/\w\S*/g, function(txt){
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}
}
