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
import {DeviceDetectorModule} from 'ngx-device-detector';
import {PressComponent} from './press/press.component';
import {SafePipe} from '../util/safepipe';
import {RewardComponent} from './reward/reward.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RewardService} from './reward/reward.service';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		HomeComponent,
		FooterComponent,
		DonateComponent,
		ThankYouComponent,
		NewsComponent,
		AboutComponent,
        PressComponent,
		RewardComponent,
		SafePipe
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
			{ path: 'press', component: PressComponent },
			{ path: 'reward', component: RewardComponent },
			{ path: '**', redirectTo: ''}
		]),
        DeviceDetectorModule.forRoot(),
		FormsModule,
		HttpClientModule
	],
	providers: [ RewardService ],
	bootstrap: [AppComponent]
})
export class AppModule {
}
