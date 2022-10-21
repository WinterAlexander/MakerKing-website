
/**
 * Represents the settings for the music player
 */
export class PlayerSettings {
	private static readonly DEFAULT_PLAYER_PREFERENCE: string[] = ['soundcloud', 'youtube', 'bandcamp']
	private static readonly DEFAULT_AUTOPLAY: boolean = true
	private static readonly DEFAULT_RESTART_ON_RESET: boolean = false

	private storage: Storage

	constructor(storage: Storage = localStorage) {
		this.storage = storage
	}

	public getPlayerPreference(): string[] {
		return JSON.parse(this.storage.getItem('player-preference'))
			|| PlayerSettings.DEFAULT_PLAYER_PREFERENCE
	}

	public setPlayerPreference(playerPreference: string[]) {
		this.storage.setItem('player-preference', JSON.stringify(playerPreference))
	}

	public isAutoplay(): boolean {
		const autoplay = this.storage.getItem('autoplay')

		if (autoplay == null) {
			return PlayerSettings.DEFAULT_AUTOPLAY
		}

		return autoplay === 'true'
	}

	public setAutoplay(autoplay: boolean): void {
		this.storage.setItem('autoplay', autoplay.toString())
	}

	public isRestartOnReset(): boolean {

		const restartOnReset = this.storage.getItem('restart-on-reset')

		if (restartOnReset == null) {
			return PlayerSettings.DEFAULT_RESTART_ON_RESET
		}

		return restartOnReset === 'true'
	}

	public setRestartOnReset(restartOnReset: boolean): void {
		this.storage.setItem('restart-on-reset', restartOnReset.toString())
	}
}
