export class LeaderboardEntry {
	constructor(public userId: number,
				public username: string,
				public rank: number,
				public bestRank: number,
				public score: number,
				public bestScore: number) {}
}
