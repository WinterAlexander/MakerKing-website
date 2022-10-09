import { SavedSong } from './SavedSong';

/**
 * Represents the settings of this overwolf app
 */
export class AppSettings {
	private static readonly DEFAULT_PLAYER_PREFERENCE: string[] = ['soundcloud', 'youtube', 'bandcamp'];
	private static readonly DEFAULT_AUTOPLAY: boolean = true;
	private static readonly DEFAULT_RESTART_ON_RESET: boolean = false;

	private storage: Storage;

	constructor(storage: Storage = localStorage) {
		this.storage = storage;
	}

	public getPlayerPreference(): string[] {
		return JSON.parse(this.storage.getItem('player-preference'))
			|| AppSettings.DEFAULT_PLAYER_PREFERENCE;
	}

	public setPlayerPreference(playerPreference: string[]) {
		this.storage.setItem('player-preference', JSON.stringify(playerPreference));
	}

	public isAutoplay(): boolean {
		const autoplay = this.storage.getItem('autoplay');

		if (autoplay == null) {
			return AppSettings.DEFAULT_AUTOPLAY;
		}

		return autoplay === 'true';
	}

	public setAutoplay(autoplay: boolean): void {
		this.storage.setItem('autoplay', autoplay.toString());
	}

	public isRestartOnReset(): boolean {

		const restartOnReset = this.storage.getItem('restart-on-reset');

		if (restartOnReset == null) {
			return AppSettings.DEFAULT_RESTART_ON_RESET;
		}

		return restartOnReset === 'true';
	}

	public setRestartOnReset(restartOnReset: boolean): void {
		this.storage.setItem('restart-on-reset', restartOnReset.toString());
	}

	public getSavedSongs(): SavedSong[] {
		return JSON.parse(this.storage.getItem('saved-songs')) || [];
	}

	public setSavedSongs(savedSongs: SavedSong[]) {
		this.storage.setItem('saved-songs', JSON.stringify(savedSongs));
	}
}
