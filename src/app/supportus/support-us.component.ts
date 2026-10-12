import { Component, NgZone, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Title } from '@angular/platform-browser'
import {DISCORD_ADDRESS} from "../social-constants";

@Component({
	selector: 'app-support-us',
	templateUrl: './support-us.component.html',
	changeDetection: ChangeDetectionStrategy.Eager,
	styleUrls: ['./support-us.component.css']
})
export class SupportUsComponent implements OnInit {

	constructor(private ngZone: NgZone,
				private title: Title) {}

	ngOnInit() {
		this.title.setTitle('MakerKing - Support us with frisbee coins')
	}

	public readonly DISCORD_ADDRESS = DISCORD_ADDRESS;
}
