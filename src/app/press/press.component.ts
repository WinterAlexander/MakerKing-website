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
    
    constructor(private title: Title) {}

    ngOnInit() {
        this.title.setTitle('Jumpaï Press Kit');
    }
}
