import { optimizeCloudinaryUrl } from "./imageUrl";

describe("optimizeCloudinaryUrl", () => {
  it("adds c_limit,w_3840,f_auto,q_auto when no explicit dimensions provided", () => {
    const url =
      "https://res.cloudinary.com/saasquatch/image/upload/v1644000278/squatch-assets/bTwu1Um.png";
    expect(optimizeCloudinaryUrl(url)).toBe(
      "https://res.cloudinary.com/saasquatch/image/upload/c_limit,w_3840,f_auto,q_auto/v1644000278/squatch-assets/bTwu1Um.png",
    );
  });

  it("uses explicit width and height instead of c_limit when provided", () => {
    const url =
      "https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_leaderboard2.png";
    expect(optimizeCloudinaryUrl(url, { width: 128, height: 128 })).toBe(
      "https://res.cloudinary.com/saasquatch/image/upload/w_128,h_128,f_auto,q_auto/v1644360953/squatch-assets/empty_leaderboard2.png",
    );
  });

  it("returns non-Cloudinary URLs unchanged", () => {
    expect(
      optimizeCloudinaryUrl("https://images.unsplash.com/photo-123?w=800"),
    ).toBe("https://images.unsplash.com/photo-123?w=800");
  });

  it("returns falsy input unchanged", () => {
    expect(optimizeCloudinaryUrl("")).toBe("");
    expect(optimizeCloudinaryUrl(undefined)).toBe(undefined);
  });

  it("does not double-transform URLs with existing f_ or q_ parameters", () => {
    const withFormat =
      "https://res.cloudinary.com/saasquatch/image/upload/w_200,f_auto,q_auto/v1644000278/squatch-assets/bTwu1Um.png";
    expect(optimizeCloudinaryUrl(withFormat)).toBe(withFormat);
  });

  it("returns Cloudinary non-image URLs unchanged", () => {
    const videoUrl =
      "https://res.cloudinary.com/saasquatch/video/upload/v1644000278/squatch-assets/demo.mp4";
    expect(optimizeCloudinaryUrl(videoUrl)).toBe(videoUrl);
  });
});
