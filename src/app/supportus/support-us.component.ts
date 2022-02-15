import { Component, NgZone, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-support-us',
	templateUrl: './support-us.component.html',
	styleUrls: ['./support-us.component.css']
})
export class SupportUsComponent implements OnInit {

	constructor(private ngZone: NgZone,
				private title: Title) {}

	ngOnInit() {
		this.title.setTitle('MakerKing - Support us with frisbee coins');
	}
}
