import { OrganisedStoryWithSubs, StoryWithSubs } from ".";

export function organiseStories(
  prev: OrganisedStoryWithSubs,
  curr: StoryWithSubs
): OrganisedStoryWithSubs {
  const splitTitle = curr.story.title.split("/");
  const group = splitTitle[1] ? splitTitle[0] : "_";
  const title = splitTitle[1] || splitTitle[0];

  return {
    ...prev,
    [group]: [
      ...(prev[group] || []),
      {
        story: {
          ...curr.story,
          title,
        },
        subs: curr.subs,
      },
    ].sort((a, b) => a.story.title.localeCompare(b.story.title)),
  };
}
