import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-touchedcraft',
	templateUrl: './touchedcraft.component.html',
	styleUrls: ['./touchedcraft.component.css']
})
export class TouchedcraftComponent implements OnInit {

	constructor(private title: Title,
				private activatedRoute: ActivatedRoute,
				private router: Router) {}

	ngOnInit() {
		this.title.setTitle('Retrouvailles TouchedCraft');
	}
}
