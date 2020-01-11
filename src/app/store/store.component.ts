import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {DISCORD_ADDRESS} from '../social-constants';

@Component({
	selector: 'store',
	templateUrl: './store.component.html',
	styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
    discordAddress: string = DISCORD_ADDRESS;

	constructor(private title: Title) {}

    ngOnInit() {
        this.title.setTitle('Jumpaï - Buy coins for cosmetics');
    }
}
