import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {DISCORD_ADDRESS} from '../social-constants';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: [ './about.component.css' ]
})
export class AboutComponent implements OnInit {
    discordAddress: string = DISCORD_ADDRESS;

    constructor(private title: Title) {}

    ngOnInit() {
        this.title.setTitle('Jumpaï - About us');
    }
}
