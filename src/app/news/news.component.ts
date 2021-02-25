import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
	selector: 'app-news',
	templateUrl: './news.component.html',
	styleUrls: [ './news.component.css' ],
})
export class NewsComponent implements OnInit, AfterViewInit {
	constructor(private title: Title) {}

	ngOnInit(): void {
		this.title.setTitle('MakerKing - News and updates');
	}

	ngAfterViewInit(): void {
		// @ts-ignore
		twttr.widgets.load();
	}
}
