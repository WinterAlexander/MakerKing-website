/**
 * Represents a MakerKing reward to be described on the reward page and awarded by
 * the MakerKing server backend
 */
export class Reward {
	id: string;
	name: string;
	description: string;
	items: RewardItem[];
	needKey: boolean;
}

export class RewardItem {
	name: string;
	image: string; // path to image
}
