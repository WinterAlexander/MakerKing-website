
/**
 * Represents the settings for the music player
 */
export class PlayerSettings {
	private static readonly DEFAULT_PLAYER_PREFERENCE: string[] = ['soundcloud', 'youtube', 'bandcamp']
	private static readonly DEFAULT_AUTOPLAY: boolean = true

	private storage: Storage

	constructor(storage: Storage = localStorage) {
		this.storage = storage
	}

	public getPlayerPreference(): string[] {
		const arr = JSON.parse(this.storage.getItem('player-preference'))

		if (!arr || arr.length !== PlayerSettings.DEFAULT_PLAYER_PREFERENCE.length)
			return PlayerSettings.DEFAULT_PLAYER_PREFERENCE

		return arr
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
}
