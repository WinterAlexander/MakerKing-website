/**
 * Represents an ID to a bandcamp track, which has both an ID string to a track
 * and an ablum under bandcamp's format
 */
export class BandcampId {
	constructor(public trackId: string,
				public albumId: string) {}
}
