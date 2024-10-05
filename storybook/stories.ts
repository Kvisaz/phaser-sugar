import { IStoryListItem, storyTitle } from "./interfaces";
import { textRectangleStory } from "./tests/TextRectangle.story";

export const stories: IStoryListItem[] = Array.from(
  new Set<IStoryListItem>([
    storyTitle("Simple Components"),
    textRectangleStory
  ])
);
