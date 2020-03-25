import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {DeviceDetectorService} from 'ngx-device-detector';
import {ITCHIO_ADDRESS} from '../social-constants';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	videoAddress: string = 'https://www.youtube.com/embed/EusrNr85pTo' +
		'?autoplay=1' +
		'&mute=1' +
		'&modestbranding=1' +
		'&rel=0';
	downloadAddress: string = ITCHIO_ADDRESS;
	downloadText: string;

	constructor(private title: Title,
				private deviceService: DeviceDetectorService) {
		this.downloadText = this.deviceService.isDesktop()
			? 'Download'
			: 'Download<br/>(for desktops only)';
	}

	ngOnInit() {
		this.title.setTitle('Jumpaï - Create your levels!');
	}
}
