export class PlayerStats {
	constructor(public playerName: string,
				public bestScore: number,
				public bestRank: number,
				public score: number,
				public scoreRank: number,
				public levelsCleared: number,
				public worldRecords: number,
				public levelsMade: number,
				public starsReceived: number,
				public avgStars: number) {}
}
