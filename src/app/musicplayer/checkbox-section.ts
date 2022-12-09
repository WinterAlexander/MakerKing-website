/**
 * Section of the music player meant to let the user configure its experience
 * with checkbox options
 */
import { PlayerSettings } from './player-settings'

export class CheckboxSection {

	private readonly autoPlayCheckbox: HTMLInputElement

	private readonly settings: PlayerSettings = new PlayerSettings()

	constructor() {
		this.autoPlayCheckbox = <HTMLInputElement>document.getElementById('music_autoplay')

		this.autoPlayCheckbox.checked = this.settings.isAutoplay()

		this.autoPlayCheckbox.onchange = (event: Event) => {
			this.settings.setAutoplay((event.target as HTMLInputElement).checked)
		}
	}

	public isAutoplay(): boolean {
		return this.autoPlayCheckbox.checked
	}
}
