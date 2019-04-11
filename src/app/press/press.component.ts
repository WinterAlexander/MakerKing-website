import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {DISCORD_ADDRESS} from '../social-constants';

@Component({
    selector: 'press',
    templateUrl: './press.component.html',
    styleUrls: ['./press.component.css']
})
export class PressComponent implements OnInit {
    constructor(private title: Title) {}

    ngOnInit() {
        this.title.setTitle('Jumpaï Press Kit');
    }
}
