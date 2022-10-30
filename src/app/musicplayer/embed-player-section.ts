import { MusicOption } from './music-option'
import { HttpClient } from '@angular/common/http'
import { BandcampId } from './bandcamp-id'
import { MusicPlayerComponent } from './music-player.component'
import { environment } from '../../environments/environment'

/**
 * Section of the overview window that contains embed players
 */
export class EmbedPlayerSection {

	private readonly embedPlayer: HTMLElement

	private soundcloudIdMap: Map<string, string> = new Map<string, string>()
	private bandcampIdMap: Map<string, BandcampId> = new Map<string, BandcampId>()

	private currentOption: MusicOption = null

	constructor(private readonly window: MusicPlayerComponent,
				private readonly http: HttpClient) {
		this.embedPlayer = document.getElementById('player-container')
	}

	private static getYouTubeID(url: string): string {
		return new URL(url).searchParams.get('v')
	}

	public updatePlayer(option: MusicOption) {
		if (option === this.currentOption)
			return

		this.currentOption = option

		if (option == null) {
			this.embedPlayer.innerHTML = ''
			return
		}

		if (option.provider === 'soundcloud') {
			this.getSoundCloudID(option.url).then(id => {
				this.embedPlayer.innerHTML = this.getSoundCloudPlayerSource(id)
			}).catch(err => {
				console.log('Error getting SoundCloud ID: ')
				console.log(err)
			})
		} else if (option.provider === 'bandcamp') {
			this.getBandcampID(option.url).then(id => {
				this.embedPlayer.innerHTML = EmbedPlayerSection.getBandcampPlayerSource(id)
			}).catch(err => {
				console.log('Error getting Bandcamp ID: ')
				console.log(err)
			})
		} else if (option.provider === 'youtube') {
			const id = EmbedPlayerSection.getYouTubeID(option.url)
			this.embedPlayer.innerHTML = this.getYouTubePlayerSource(id)
		}
	}


	private getSoundCloudID(url: string): Promise<string> {
		if (this.soundcloudIdMap.has(url))
			return Promise.resolve(this.soundcloudIdMap.get(url))

		return this.http.get(environment.server + '/songid?url=' + encodeURIComponent(url) + '&provider=soundcloud', { responseType: 'text' })
			.toPromise()
			.then((responseBody: string) => {

			this.soundcloudIdMap.set(url, responseBody)
			return responseBody
		})
	}

	private getBandcampID(url: string): Promise<BandcampId> {
		if (this.bandcampIdMap.has(url)) {
			return Promise.resolve(this.bandcampIdMap.get(url))
		}

		return this.http.get(environment.server + '/songid?url=' + encodeURIComponent(url) + '&provider=bandcamp', { responseType: 'text' })
			.toPromise()
			.then((responseBody: string) => {

			const parts = responseBody.split(',')

			const id = new BandcampId(parts[0], parts[1])
			this.bandcampIdMap.set(url, id)

			return id
		})
	}

	private static getBandcampPlayerSource(id: BandcampId): string {
		return '<iframe style="border: 0 width: 400px height: 120px" ' +
			'       src="https://bandcamp.com/EmbeddedPlayer/album=' + id.albumId +
				'/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/track=' +
				id.trackId + '/transparent=true/">' +
			'</iframe>'
	}

	private getSoundCloudPlayerSource(id: string): string {
		return '<iframe width="100%"\n' +
			'       height="166"\n' +
			// '       scrolling="no"\n' +
			// '       frameborder="no"\n' +
			(this.window.isAutoplay() ? '     allow="autoplay"\n' : '') +
			'       src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' +
				id + '&color=%23ff5500&auto_play=' + this.window.isAutoplay() +
				'&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true">\n' +
			'</iframe>'
	}

	private getYouTubePlayerSource(id: string): string {
		return '<iframe width="100%"' +
			'    height="200px"' +
			'    src="https://www.youtube.com/embed/' + id + '?autoplay=' + (this.window.isAutoplay() ? '1' : '0') + '" ' +
			'    title="YouTube video player" ' +
			// '    frameborder="0" ' +
			'    allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture" ' +
			'    allowfullscreen>' +
			'</iframe>'
	}
}
