/**
 * Section of the OverviewWindow meant to let the user configure its experience
 * with checkbox options
 */
import { AppSettings } from './AppSettings';

export class CheckboxSection {

	private readonly autoPlayCheckbox: HTMLInputElement;
	private readonly restartSongCheckbox: HTMLInputElement;

	private readonly settings: AppSettings = new AppSettings();

	constructor() {
		this.autoPlayCheckbox = <HTMLInputElement>document.getElementById('music_autoplay');
		this.restartSongCheckbox = <HTMLInputElement>document.getElementById('music_restartondeath');

		this.autoPlayCheckbox.checked = this.settings.isAutoplay();
		this.restartSongCheckbox.checked = this.settings.isRestartOnReset();

		this.autoPlayCheckbox.onchange = (event: Event) => {
			this.settings.setAutoplay((event.target as HTMLInputElement).checked);
		};

		this.restartSongCheckbox.onchange = (event: Event) => {
			this.settings.setRestartOnReset((event.target as HTMLInputElement).checked);
		};
	}

	public isAutoplay(): boolean {
		return this.autoPlayCheckbox.checked;
	}

	public isRestart(): boolean {
		return this.restartSongCheckbox.checked;
	}
}
