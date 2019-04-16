/**
 * Represents a Jumpaï reward to be described on the reward page and awarded by
 * the Jumpaï server backend
 */
export class Reward {
	id: string;
	name: string;
	description: string;
	items: RewardItem[];
}

export class RewardItem {
	name: string;
	image: string; // path to image
}