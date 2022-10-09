import { MusicOption } from './MusicOption';

/**
 * Represents all information available about a music track for later retrieval
 * by the user
 */
export class SavedSong {
	constructor(public trackName: string,
				public artistName: string,
				public options: MusicOption[]) {}
}
