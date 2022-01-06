import { h } from "@stencil/core";
import { Resizer } from "../sqm-stencilbook/Resizer";
import { MediaView } from "./sqm-media-view";

export default {
  title: "Components/Media",
};

export const Image = () => {
  return <MediaView imgUrl="https://i.imgur.com/bTwu1Um.jpg" />;
};

export const ImageWithHeader = () => {
  return (
    <MediaView
      imageHeader="Klip Rewards"
      imageDescription="Refer friends or complete tasks while using Klip to earn rewards"
      imgUrl="https://i.imgur.com/bTwu1Um.png"
    />
  );
};
export const ImageWithHeaderButton = () => {
  return (
    <MediaView
      imageHeader="Klip Rewards"
      imageDescription="Refer friends or complete tasks while using Klip to earn rewards"
      buttonText="Start earning"
      imgUrl="https://i.imgur.com/bTwu1Um.png"
    />
  );
};

export const Header = () => {
  return <MediaView header="Leaderboard" />;
};

export const Description = () => {
  return (
    <MediaView description="Be one of the top 3 referrers at the end of the year and receive Klip free for 1 year!" />
  );
};

export const HeaderWithImage = () => {
  return (
    <MediaView
      header="Leaderboard"
      description="Be one of the top 3 referrers at the end of the year and receive Klip free for 1 year!"
      imgUrl="https://i.imgur.com/rWYyJWz.jpg"
    />
  );
};
export const HTML = () => {
  return (
    <Resizer>
      <MediaView>
        <div style={{ background: "antiquewhite" }}>
          <h1 style={{ color: "blue" }}>A Blue Heading</h1>
          <p style={{ color: "red" }}>A red paragraph.</p>
        </div>
      </MediaView>
    </Resizer>
  );
};
