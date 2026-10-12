import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { StoreComponent } from './store/store.component'
import { AboutComponent } from './about/about.component'
import { ThankYouComponent } from './store/thankyou/thankyou.component'
import { NewsComponent } from './news/news.component'
import { PressComponent } from './press/press.component'
import { RewardComponent } from './reward/reward.component'
import { LeaderboardComponent } from './leaderboard/leaderboard.component'
import { PlayerListComponent } from './stats/playerlist.component'
import { LevelComponent } from './level/level.component'
import { PlayerComponent } from './user/player.component'
import { SupportUsComponent } from './supportus/support-us.component'
import { MusicPlayerComponent } from './musicplayer/music-player.component'

export const routes: Routes = [
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
	{ path: 'level', component: LevelComponent },
	{ path: 'player', component: PlayerComponent },
	{ path: 'supportus', component: SupportUsComponent },
	{ path: 'musicplayer', component: MusicPlayerComponent },
	{ path: '**', redirectTo: ''}
]
