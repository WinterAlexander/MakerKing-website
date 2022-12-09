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

	private soundcloudVolume = 100

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

				// @ts-ignore
				const widget = SC.Widget(document.getElementById('sc-widget'))
				const slider = document.getElementById('sc-volume') as HTMLInputElement
				let ready = false

				// @ts-ignore
				widget.bind(SC.Widget.Events.READY, () => {
					widget.setVolume(this.soundcloudVolume)
					// @ts-ignore
					widget.bind(SC.Widget.Events.FINISH, () => {
						widget.seekTo(0)
						widget.play()
					})
					ready = true
				})

				slider.oninput = () => {
					this.soundcloudVolume = +slider.value
					if (ready) {
						widget.setVolume(this.soundcloudVolume)
					}
				}

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

			// @ts-ignore
			const widget = new YT.Player('yt-widget', { 'events': {
				'onStateChange': (event: any) => {
					// @ts-ignore
					if (event.data === YT.PlayerState.ENDED) {
						widget.seekTo(0, true)
						widget.playVideo()
					}
				}
			}})

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
		return '<iframe id="sc-widget" width="100%" height="166" ' +
			(this.window.isAutoplay() ? 'allow="autoplay"\n' : '') +
			' src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' +
				id + '&color=%23ff5500&auto_play=' + this.window.isAutoplay() +
				'&hide_related=true&show_comments=true&show_user=true&show_reposts=false' +
				'&show_teaser=true&buying=false&sharing=false&download=false&color=#5CD65C">\n' +
			'</iframe><span>Sound cloud volume:</span><br />' +
			'<input type="range" min="0" max="100" value="' + this.soundcloudVolume + '" class="slider" id="sc-volume">'
	}

	private getYouTubePlayerSource(id: string): string {
		return '<iframe id="yt-widget" width="100%" height="200px"' +
			'    src="https://www.youtube.com/embed/' + id + '?autoplay=' + (this.window.isAutoplay() ? '1' : '0') + '&loop=1&enablejsapi=1" ' +
			'    title="YouTube video player" ' +
			// '    frameborder="0" ' +
			'    allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture" ' +
			'    allowfullscreen>' +
			'</iframe>'
	}
}
