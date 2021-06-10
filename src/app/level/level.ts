export class Level {
	constructor(public levelName: string,
				public ownerId: number,
				public ownerName: string,
				public state: string,
				public lastEdit: number,
				public type: string,
				public tags: string[]) {}
}
