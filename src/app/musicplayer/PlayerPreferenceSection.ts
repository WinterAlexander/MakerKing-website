import { MusicOption } from './MusicOption';
import { AppSettings } from './AppSettings';

/**
 * Section of the overview window used to let the user select its preference
 * for music players
 */
export class PlayerPreferenceSection {
	private readonly container: HTMLElement;
	private readonly players: HTMLElement[];

	private dragging: HTMLElement;

	private readonly updateCallback: () => void;

	private readonly settings: AppSettings = new AppSettings();

	constructor(updateCallback: () => void) {

		this.updateCallback = updateCallback;

		this.container = document.getElementById('draggable-container');

		this.players = [];

		for (const provider of this.settings.getPlayerPreference()) {
			const player = document.getElementById('draggable-' + provider);
			this.players.push(player);
			this.container.appendChild(player);
		}

		for (const draggable of this.players) {
			draggable.draggable = true;
			draggable.addEventListener('dragstart', this.startDrag.bind(this));
			draggable.addEventListener('dragenter', this.dragOver.bind(this));
			draggable.addEventListener('drop', this.endDrag.bind(this));

			for (const child of draggable.children[Symbol.iterator]) {
				if (child instanceof HTMLElement) {
					child.draggable = false;
				}
			}
		}

		this.dragging = null;
	}

	private startDrag(event: DragEvent): void {
		if (event.target instanceof HTMLElement
			&& this.players.includes(event.target)) {
			this.dragging = event.target;
		}
	}

	private endDrag(event: DragEvent): void {
		if (event.target instanceof HTMLElement
			&& event.target === this.dragging) {
			this.dragging = null;
		}
	}

	private dragOver(event: DragEvent): void {

		if (this.dragging == null
			|| event.target === this.dragging
			|| !(event.target instanceof HTMLElement)
			|| event.target.parentElement !== this.container) {
			return;
		}

		const childAddr = Array.from(this.container.children);

		if (childAddr.indexOf(this.dragging) > childAddr.indexOf(event.target)) {
			this.container.insertBefore(this.dragging, event.target);
		} else {
			this.container.insertBefore(event.target, this.dragging);
		}
		this.updateSettings();
		this.updateCallback();
	}

	private updateSettings(): void {

		const providers = [];
		for (const child of this.container.children[Symbol.iterator]) {
			if (child instanceof HTMLElement && this.players.includes(child)) {
				providers.push(child.id.substring('draggable-'.length));
			}
		}

		this.settings.setPlayerPreference(providers);
	}

	public getPreferedOption(options: MusicOption[]): MusicOption {

		const childAddr = Array.from(this.container.children);
		let prefered = options[0];

		for (let i = 1; i < options.length; i++) {
			const current = document.getElementById('draggable-' + options[i].provider);
			const preferedElem = document.getElementById('draggable-' + prefered.provider);

			if (childAddr.indexOf(current) < childAddr.indexOf(preferedElem)) {
				prefered = options[i];
			}
		}

		return prefered;
	}
}
