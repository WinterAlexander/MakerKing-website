import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { Title } from '@angular/platform-browser';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    videoAddress:string = "https://www.youtube.com/embed/NgpSvalo2Lk" +
        "?autoplay=1" +
        "&mute=1" +
        "&modestbranding=1" +
        "&rel=0";
    downloadAddress:string = "https://beartrapstudio.itch.io/jumpai";
    downloadText:string;

    constructor(public sanitizer: DomSanitizer,
                private title: Title,
                private deviceService: DeviceDetectorService)
    {
        this.downloadText = this.deviceService.isDesktop()
            ? 'Download'
            : 'Download<br/>(for desktops only)';
    }

    ngOnInit() {
        this.title.setTitle('Jumpaï - Create your levels!');
    }
}
