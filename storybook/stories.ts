import { IStoryListItem, storyTitle } from "./interfaces";
import { textRectangleStory } from "./tests/TextRectangle.story";
import { launchSceneAutoRunAndPauseMainStory } from "../src/scenes/ChildScene/launchSceneAutoRunAndPauseMain.story";
import { launchSceneAutoRunStory } from "../src/scenes/ChildScene/launchSceneAutoRun.story";
import { launchSceneStory2 } from "../src/scenes/ChildScene/launchScene2.story";
import { launchSceneStory } from "../src/scenes/ChildScene/launchScene.story";
import { alignStory } from "../src/layout/Align/Align.story";
import { viewPortStory } from "../src/components/ViewPort/ViewPort.story";
import { alignChainStory } from "../src/layout/alignChains/alignChainStory";

export const stories: IStoryListItem[] = Array.from(
  new Set<IStoryListItem>([
    storyTitle("View Port"),
    viewPortStory,
    storyTitle("Align"),
    alignStory,
    alignChainStory,
    storyTitle("Child Scene"),
    launchSceneAutoRunAndPauseMainStory,
    launchSceneAutoRunStory,
    launchSceneStory2,
    launchSceneStory,
    storyTitle("Simple Components"),
    textRectangleStory
  ])
);
