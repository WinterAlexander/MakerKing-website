import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from "@angular/router";
import { DonateComponent } from "./donate/donate.component";
import { ThankYouComponent } from "./donate/thankyou/thankyou.component";

@NgModule({
	declarations: [
		AppComponent, HeaderComponent, HomeComponent, FooterComponent, DonateComponent, ThankYouComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot([
			{ path: 'home', redirectTo: '', pathMatch: 'full' },
			{ path: '', component: HomeComponent },
			{ path: 'donate', component: DonateComponent },
			{ path: 'thankyou', component: ThankYouComponent },
		]),
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
