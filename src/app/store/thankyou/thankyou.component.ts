import {Component, ChangeDetectionStrategy} from '@angular/core'
import {DISCORD_ADDRESS} from '../../social-constants'

@Component({
	selector: 'app-thankyou',
	templateUrl: './thankyou.component.html',
	changeDetection: ChangeDetectionStrategy.Eager,
	styleUrls: ['./thankyou.component.css']
})
export class ThankYouComponent {
	discordAddress: string = DISCORD_ADDRESS
}
