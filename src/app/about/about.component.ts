import {Component, OnInit} from '@angular/core'
import {Title} from '@angular/platform-browser'
import { DISCORD_ADDRESS, EMAIL_ADDRESS } from '../social-constants'

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: [ './about.component.css' ]
})
export class AboutComponent implements OnInit {
	discordAddress: string = DISCORD_ADDRESS
	emailAddress: string = EMAIL_ADDRESS

	constructor(private title: Title) {}

	ngOnInit() {
		this.title.setTitle('MakerKing - About us')
	}
}
