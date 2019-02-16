import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {DISCORD_ADDRESS} from '../social-constants';

@Component({
	selector: 'donate',
	templateUrl: './donate.component.html',
	styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {
    discordAddress: string = DISCORD_ADDRESS;

	constructor(private title: Title) {}

    ngOnInit() {
        this.title.setTitle('Jumpaï - Support Jumpaï');
    }
}
