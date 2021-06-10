export class LevelLeaderboardEntry {
	constructor(public runId: number,
				public playerId: number,
				public playerName: string,
				public position: number,
				public score: number,
				public tickLength: number,
				public subFrame: number,
				public deaths: number,
				public blind: boolean,
				public timestamp: number) {}
}
