export class StoreItem {
	constructor(public title: string,
				public subTitle: string,
				public iconPath: string,
				public price: string) {}

	public getName(): string {
		return this.title + ' ' + this.subTitle;
	}
}
