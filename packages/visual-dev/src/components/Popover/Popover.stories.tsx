import * as React from "react";
import { PopoverView } from ".";
import { Paragraph } from "../Paragraph";
import { IconView } from "../Icon";
import { HoverPopover } from "./HoverPopover";
import { CopyWrapperView } from "../CopyWrapper/CopyWrapper";

export default {
  title: "Components / Popover",
  component: PopoverView,
};

export const Default = () => {
  return (
    <PopoverView show={true} relativeX="24px" relativeY="24px">
      <PopoverView.SectionView>
        <Paragraph size="2" bold>
          Shown in widgets, emails, and used in integrations, API, for:
        </Paragraph>
        <Paragraph size="2">Test program</Paragraph>
      </PopoverView.SectionView>
      <PopoverView.SectionView>
        Here is a long amount of text by itself to show that the text wraps
        after a certain width
      </PopoverView.SectionView>
      <PopoverView.SectionView>
        <PopoverView.ActionView>Popover action</PopoverView.ActionView>
      </PopoverView.SectionView>
    </PopoverView>
  );
};

export const Functional = () => {
  return (
    <HoverPopover handle={<span>This is a popover, hover here</span>}>
      <PopoverView>
        <PopoverView.SectionView>
          <Paragraph size="2" bold>
            Shown in widgets, emails, and used in integrations, API, for:
          </Paragraph>
          <Paragraph size="2">Test program</Paragraph>
        </PopoverView.SectionView>
        <PopoverView.SectionView>
          Here is a long amount of text by itself to show that the text wraps
          after a certain width
        </PopoverView.SectionView>
        <PopoverView.SectionView>
          <PopoverView.ActionView>Popover action</PopoverView.ActionView>
        </PopoverView.SectionView>
      </PopoverView>
    </HoverPopover>
  );
};

export const PopoverWidthLongWord = () => {
  return (
    <PopoverView>
      <PopoverView.SectionView>
        The longest town name in Wales is:
        Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch
      </PopoverView.SectionView>
      <PopoverView.SectionView>
        <PopoverView.ActionView>
          The longest town name in New Zealand is:
          Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu
        </PopoverView.ActionView>
      </PopoverView.SectionView>
    </PopoverView>
  );
};

export const WithPositionOffset = () => {
  return (
    <HoverPopover handle={<span>This is a popover, hover here</span>}>
      <PopoverView relativeX="100px" relativeY="100px">
        <PopoverView.SectionView>
          <Paragraph size="2" bold>
            Shown in widgets, emails, and used in integrations, API, for:
          </Paragraph>
          <Paragraph size="2">Test program</Paragraph>
        </PopoverView.SectionView>
        <PopoverView.SectionView>
          Here is a long amount of text by itself to show that the text wraps
          after a certain width
        </PopoverView.SectionView>
        <PopoverView.SectionView>
          <PopoverView.ActionView>Popover action</PopoverView.ActionView>
        </PopoverView.SectionView>
      </PopoverView>
    </HoverPopover>
  );
};

export const OnlyAction = () => (
  <PopoverView show={true} relativeX="24px" relativeY="24px">
    <PopoverView.ActionView onClick={() => console.log("Hello")}>
      Something
    </PopoverView.ActionView>
  </PopoverView>
);

export const CustomPadding = () => (
  <PopoverView padding="100px" show={true} relativeX="24px" relativeY="24px">
    <PopoverView.ActionView onClick={() => console.log("Hello")}>
      Something
    </PopoverView.ActionView>
  </PopoverView>
);

export const OnlyOneChild = () => (
  <PopoverView show={true} relativeX="24px" relativeY="24px">
    Here is a long amount of text by itself to show that the text wraps after a
    certain width
  </PopoverView>
);

export const CopyPopover = () => (
  <PopoverView show={true} relativeX="24px" relativeY="24px">
    <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      http://coleton-example.com/mz3aN3{" "}
      <CopyWrapperView
        copyCallback={(result: boolean) => {
          console.log(result);
        }}
        copyContent="This is test clipboard content"
      >
        <IconView icon="copy" color="var(--sq-action-primary)" />
      </CopyWrapperView>
    </span>
  </PopoverView>
);
