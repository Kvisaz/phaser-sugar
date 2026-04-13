# phaser-sugar
Phaser 3.80 tools and utilities

- [GitHub](https://github.com/Kvisaz/phaser-sugar)
- [Storybook](https://kvisaz.github.io/phaser-sugar/storybook/index.html)
- [Docs draft web page](https://kvisaz.github.io/phaser-sugar/)
- [CHANGE_LOG](changelog.md)

version 1.1.7

# Features
- [layoutColumn, layoutRow, layoutChain](docs/pages/layoutChain.md)
- ViewPort component
- camera/addCameraDraggingToObject for world camera scrolling
- typeGuards for TypeScript: 
  - isScene, isRectangle, hasGetBounds, hasWidthHeight
  -  isContainer, isImage, isSpite, isText
- Layout for area layout
- AlignMethod as command collectios for Align.applyMethod(alignMethod, obj, ...args)
- align chains for array layouts - rows, columns, chains
- ArrayAlignObject class for array layout without containers
- ChildSceneProxy - easy add child scene, like popup or ui, to pause main scene
- setContainerInteractive (add size before setInteractive)
- Align objects - any GameObject with x,y, setPosition, getBounds
- NineSlice, Zone added as type to Align
- NiceText - add text in nice style with fontSizePx and wordWrap
- Preload tasks - just write PreloadTask.load(scene, ()=>Promise) to wait async operations in Phaser Load
- font loader
```typescript
loadFont({
  scene, fontFamily: "Title", url: `${urlBase}/BalsamiqSans-Bold.ttf`
});
```
- [Align](docs/pages/align.md) - positioning game objects relative to each other with any origin
- [setLeftTop](docs/pages/align.md) - set left and top of object with any origin
- [cssColorToInt](src/color/cssColorToInt.ts) - convert css color string To Phaser Int color
- [intToCssColor](src/color/intToCssColor.ts) - convert Phaser int color to css color string 
- [delay](src/async/delay.ts) - async setTimeout
- [tweenPromise](src/async/tweenPromise.ts) - async Phaser tweens
- [Deffered](src/async/Deferred.ts) - delayed Promise
- [async loaders](src/load/loadAssets.ts) - async sugar for Phaser asset loading in any time

**Components**
- [TextRectangle](src/components/TextRectangle/TextRectangle.ts) - rectangle with text, adaptive to text size by default 
