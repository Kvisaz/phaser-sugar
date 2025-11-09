# Layout Chain

Layout Chain is the powerful method to make layout for array of objects.

layoutRow, layoutRow, layoutChain allows to order arrays of object as single object

```typescript
align.anchorSceneScreen(scene)
  .center(
    layoutRow({
      nextOffsetX: 12,
      alignToAnchor: AlignMethod.TOP_IN,
      children: [
        layoutRow({ children: textObjects1, nextOffsetY: i => i * 6 }),
        layoutColumn({ children: textObjects2, nextOffsetY: 23 }),
        layoutColumn({ children: textObjects3, nextOffsetY: i => i === 0 ? 0 : 32 }),
        layoutColumn({ children: textObjects4 })
      ]
    })
  );
```
