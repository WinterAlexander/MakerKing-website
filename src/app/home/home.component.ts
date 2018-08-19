import { Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    videoAddress:string = "https://www.youtube.com/embed/NgpSvalo2Lk";
    downloadAddress:string = "https://beartrapstudio.itch.io/jumpai";
    javaDownloadAddress: string = "https://java.com/download";

    constructor(public sanitizer: DomSanitizer) {}
}
