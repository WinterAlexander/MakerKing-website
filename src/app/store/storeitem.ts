export class StoreItem {
	constructor(public offerId: number,
				public quantity: string,
				public itemType: string,
				public iconPath: string,
				public price: string) {}

	public getName(): string {
		return this.quantity + ' ' + this.itemType;
	}
}
