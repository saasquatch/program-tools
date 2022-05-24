export declare class RewardTableStatusCell {
  statusText: string;
  reward: Reward;
  expiryText: string;
  locale: string;
  rewardStatus(reward: Reward): "" | "AVAILABLE" | "PENDING" | "CANCELLED" | "EXPIRED" | "REDEEMED";
  render(): any;
}
