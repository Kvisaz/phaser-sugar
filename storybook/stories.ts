import { IStoryListItem, storyTitle } from "./interfaces";
import { textRectangleStory } from "./tests/TextRectangle.story";
import { launchSceneAutoRunAndPauseMainStory } from "../src/scenes/ChildScene/launchSceneAutoRunAndPauseMain.story";
import { launchSceneAutoRunStory } from "../src/scenes/ChildScene/launchSceneAutoRun.story";
import { launchSceneStory2 } from "../src/scenes/ChildScene/launchScene2.story";
import { launchSceneStory } from "../src/scenes/ChildScene/launchScene.story";

export const stories: IStoryListItem[] = Array.from(
  new Set<IStoryListItem>([
    storyTitle("Child Scene"),
    launchSceneAutoRunAndPauseMainStory,
    launchSceneAutoRunStory,
    launchSceneStory2,
    launchSceneStory,
    storyTitle("Simple Components"),
    textRectangleStory
  ])
);
