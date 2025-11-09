import { IStoryListItem, storyTitle } from "./interfaces";
import { textRectangleStory } from "./tests/TextRectangle.story";
import { launchSceneAutoRunAndPauseMainStory } from "./tests/launchSceneAutoRunAndPauseMain.story";
import { launchSceneAutoRunStory } from "./tests/launchSceneAutoRun.story";
import { launchSceneStory2 } from "./tests/launchScene2.story";
import { launchSceneStory } from "./tests/launchScene.story";
import { alignStory } from "./tests/Align.story";
import { viewPortStory } from "./tests/ViewPort.story";
import { alignChainStory } from "./tests/alignChainStory";
import { layoutStory } from "./tests/Layout.story";
import { alignArrStory } from "./tests/alignArr.story";

export const stories: IStoryListItem[] = Array.from(
  new Set<IStoryListItem>([
    storyTitle("View Port"),
    viewPortStory,
    storyTitle("Align"),
    alignStory,
    alignChainStory,
    alignArrStory,
    layoutStory,
    storyTitle("Child Scene"),
    launchSceneAutoRunAndPauseMainStory,
    launchSceneAutoRunStory,
    launchSceneStory2,
    launchSceneStory,
    storyTitle("Simple Components"),
    textRectangleStory
  ])
);
