// lib/adRewards.ts
export function calculateAdReward(
  adType: "NORMAL" | "PREMIUM",
  membershipType: "FREE" | "PREMIUM"
): number {
  if (adType === "NORMAL") {
    return membershipType === "PREMIUM" ? 0.005 : 0.001;
  } else {
    // PREMIUM ads should only be shown to premium users
    return membershipType === "PREMIUM" ? 0.01 : 0;
  }
}

/**
 * Get the cost per click for advertiser based on ad type
 */
export function getAdvertiserCost(adType: "NORMAL" | "PREMIUM"): number {
  return adType === "NORMAL" ? 0.005 : 0.02;
}

/**
 * Calculate minimum package cost for advertiser
 * Minimum is 1000 impressions
 */
export function calculateMinimumPackageCost(
  adType: "NORMAL" | "PREMIUM"
): number {
  const minImpressions = 1000;
  return adType === "NORMAL" ? 5.0 : 20.0;
}
