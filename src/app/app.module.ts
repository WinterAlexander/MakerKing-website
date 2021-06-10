import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { ThankYouComponent } from './store/thankyou/thankyou.component';
import { NewsComponent } from './news/news.component';
import { AboutComponent } from './about/about.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { PressComponent } from './press/press.component';
import { SafePipe } from '../util/safepipe';
import { RewardComponent } from './reward/reward.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RewardService } from './reward/reward.service';
import { NgxPayPalModule } from 'ngx-paypal';
import { StatsService } from './stats/stats.service';
import { UserService } from './user/user.service';
import { StoreService } from './store/store.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { LeaderboardComponent } from './stats/leaderboard.component';
import { PlayerListComponent } from './stats/playerlist.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		HomeComponent,
		FooterComponent,
		StoreComponent,
		ThankYouComponent,
		NewsComponent,
		AboutComponent,
		PressComponent,
		RewardComponent,
		LeaderboardComponent,
		PlayerListComponent,
		SafePipe
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot([
			{ path: 'home', redirectTo: '', pathMatch: 'full' },
			{ path: '', component: HomeComponent },
			{ path: 'store', component: StoreComponent },
			{ path: 'about', component: AboutComponent },
			{ path: 'thankyou', component: ThankYouComponent },
			{ path: 'news', component: NewsComponent },
			{ path: 'press', component: PressComponent },
			{ path: 'reward', component: RewardComponent },
			{ path: 'leaderboard', component: LeaderboardComponent },
			{ path: 'playerlist', component: PlayerListComponent },
			{ path: '**', redirectTo: ''}
		]),
		DeviceDetectorModule.forRoot(),
		FormsModule,
		HttpClientModule,
		NgxPayPalModule,
		BrowserAnimationsModule,
		MatDialogModule
	],
	providers: [ RewardService, UserService, StatsService, StoreService ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
