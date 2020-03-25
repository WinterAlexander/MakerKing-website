export class StoreItem {
	constructor(public offerId: number,
				public quantity: number,
				public itemType: string,
				public iconPath: string,
				public price: string) {}

	public getName(): string {
		return this.quantity.toLocaleString() + ' ' + this.itemType;
	}
}
