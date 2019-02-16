import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule} from '@angular/router';
import {DonateComponent} from './donate/donate.component';
import {ThankYouComponent} from './donate/thankyou/thankyou.component';
import {NewsComponent} from './news/news.component';
import {AboutComponent} from './about/about.component';
import { DeviceDetectorModule } from 'ngx-device-detector';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		HomeComponent,
		FooterComponent,
		DonateComponent,
		ThankYouComponent,
		NewsComponent,
		AboutComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot([
			{ path: 'home', redirectTo: '', pathMatch: 'full' },
			{ path: '', component: HomeComponent },
			{ path: 'donate', component: DonateComponent },
            { path: 'about', component: AboutComponent },
			{ path: 'thankyou', component: ThankYouComponent },
			{ path: 'news', component: NewsComponent },
			{ path: '**', redirectTo: ''}
		]),
        DeviceDetectorModule.forRoot()
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
