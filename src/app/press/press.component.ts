import {Component, OnInit} from '@angular/core'
import {Title} from '@angular/platform-browser'
import {
	DISCORD_ADDRESS, TWITTER_ADDRESS, EMAIL_ADDRESS, FACEBOOK_ADDRESS, REDDIT_ADDRESS,
	YOUTUBE_ADDRESS, ITCHIO_ADDRESS
} from '../social-constants'

@Component({
	selector: 'app-press',
	templateUrl: './press.component.html',
	styleUrls: ['./press.component.css']
})
export class PressComponent implements OnInit {
	twitterAddress: string = TWITTER_ADDRESS
	discordAddress: string = DISCORD_ADDRESS
	facebookAddress: string = FACEBOOK_ADDRESS
	emailAddress: string = EMAIL_ADDRESS
	redditAddress: string = REDDIT_ADDRESS
	youtubeAddress: string = YOUTUBE_ADDRESS
	itchAddress: string = ITCHIO_ADDRESS

	screenshotPackage = 'https://drive.google.com/open?id=1ufUaSsSVt4VXemVhjY1CPsKFHi4mQdDx'
	logoPackage = 'https://drive.google.com/open?id=1jUysbP-jTqk7RTF9Fmf9zkXfl43oMvCC'

	screenshots: string[] = [
		'assets/press/screenshots/friendly_ride.png',
		'assets/press/screenshots/makerking_editor.png',
		'assets/press/screenshots/mob_swarm.png',
		'assets/press/screenshots/puzzle_editor.png',
		'assets/press/screenshots/puzzles.png',
		'assets/press/screenshots/stats.png',
		'assets/press/screenshots/titlescreen.png',
		'assets/press/screenshots/achievements.png',
		'assets/press/screenshots/cosmetics.png',
		'assets/press/screenshots/levelbrowser.png',
	]

	gifs: string[] = [
		'coarsegratefuleuropeanfiresalamander',
		'fineheftydragonfly',
		'pertinentfaintchital',
		'remotetimelyarcticfox',
		'caringtintedhypacrosaurus',
		'glitteringtartasianpiedstarling',
		'wealthysleepyastrangiacoral',
		'directediblekatydid',
	]

	constructor(private title: Title) {}

	ngOnInit() {
		this.title.setTitle('MakerKing Press Kit')
	}

	nameOf(screenshot: string): string {
		return screenshot.split('/').pop().replace('_', ' ').replace('.png', '').replace(/\w\S*/g, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
		})
	}
}
