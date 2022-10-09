import { MusicOption } from './MusicOption';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BandcampId } from './BandcampId';
import { MusicPlayerComponent } from './music-player.component';

/**
 * Section of the overview window that contains embed players
 */
export class EmbedPlayerSection {

	private readonly embedPlayer: HTMLElement;

	private soundcloudIdMap: Map<string, string> = new Map<string, string>();
	private bandcampIdMap: Map<string, BandcampId> = new Map<string, BandcampId>();


	constructor(private readonly window: MusicPlayerComponent,
				private readonly http: HttpClient) {
		this.embedPlayer = document.getElementById('player-container');
	}

	private static getYouTubeID(url: string): string {
		return new URL(url).searchParams.get('v');
	}

	public updatePlayer(option: MusicOption) {
		if (option == null) {
			this.embedPlayer.innerHTML = '';
			return;
		}

		if (option.provider === 'soundcloud') {
			this.getSoundCloudID(option.url).then(id => {
				this.embedPlayer.innerHTML = this.getSoundCloudPlayerSource(id);
			}).catch(err => {
				console.log('Error getting SoundCloud ID: ');
				console.log(err);
			});
		} else if (option.provider === 'bandcamp') {
			this.getBandcampID(option.url).then(id => {
				this.embedPlayer.innerHTML = this.getBandcampPlayerSource(id);
			}).catch(err => {
				console.log('Error getting Bandcamp ID: ');
				console.log(err);
			});
		} else if (option.provider === 'youtube') {
			const id = EmbedPlayerSection.getYouTubeID(option.url);
			this.embedPlayer.innerHTML = this.getYouTubePlayerSource(id);
		}
	}


	private getSoundCloudID(url: string): Promise<string> {
		if (this.soundcloudIdMap.has(url)) {
			return Promise.resolve(this.soundcloudIdMap.get(url));
		}

		return this.http.get(url).toPromise().then((responseBody: any) => {

			const el = document.createElement('html');
			el.innerHTML = responseBody;

			const metaTags: HTMLCollectionOf<HTMLMetaElement> = el.getElementsByTagName('meta');
			let tag: HTMLMetaElement = null;

			for (let i = 0; i < metaTags.length; i++) {
				if (metaTags.item(i).getAttribute('property') === 'twitter:app:url:googleplay') {
					tag = metaTags.item(i);
					break;
				}
			}

			if (tag == null) {
				throw new Error('Failed to find meta tag in soundcloud page (bad URL?)');
			}

			const id = tag.getAttribute('content').split(':')[2];
			this.soundcloudIdMap.set(url, id);

			return id;
		});
	}

	private getBandcampID(url: string): Promise<BandcampId> {
		if (this.bandcampIdMap.has(url)) {
			return Promise.resolve(this.bandcampIdMap.get(url));
		}

		return this.http.get(url).toPromise().then((responseBody: any) => {

			const el = document.createElement('html');
			el.innerHTML = responseBody;

			const divs: HTMLCollectionOf<HTMLDivElement> = el.getElementsByTagName('div');
			let pagedata: HTMLDivElement = null;

			for (let i = 0; i < divs.length; i++) {
				if (divs.item(i).getAttribute('id') === 'pagedata') {
					pagedata = divs.item(i);
					break;
				}
			}

			if (pagedata == null) {
				throw new Error('Failed to find pagedata in bandcamp page (bad URL?)');
			}

			const dataBlob = pagedata.getAttribute('data-blob');

			const json = JSON.parse(unescape(dataBlob));

			const id = new BandcampId(json.track_id, json.album_id);
			this.bandcampIdMap.set(url, id);

			return id;
		});
	}

	private getBandcampPlayerSource(id: BandcampId): string {
		return '<iframe style="border: 0 width: 400px height: 120px" ' +
			'       src="https://bandcamp.com/EmbeddedPlayer/album=' + id.albumId +
				'/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/track=' +
				id.trackId + '/transparent=true/" ' +
			'       seamless>' +
			'</iframe>';
	}

	private getSoundCloudPlayerSource(id: string): string {
		return '<iframe width="100%"\n' +
			'       height="166"\n' +
			'       scrolling="no"\n' +
			'       frameborder="no"\n' +
			(this.window.isAutoplay() ? '     allow="autoplay"\n' : '') +
			'       src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' +
				id + '&color=%23ff5500&auto_play=' + this.window.isAutoplay() +
				'&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true">\n' +
			'</iframe>';
	}

	private getYouTubePlayerSource(id: string): string {
		return '<iframe width="295"' +
			'    height="166" ' +
			'    src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=' + (this.window.isAutoplay() ? '1' : '0') + '" ' +
			'    title="YouTube video player" ' +
			'    frameborder="0" ' +
			'    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
			'    allowfullscreen>' +
			'</iframe>';
	}
}
