import { IBoundable } from "../types";
import { LayoutArea } from "./types";
import { hasGetBounds, hasWidthHeight, isRectangle, isScene } from "../../typeGuards";

export const getLayoutToBounds = (layoutArea: LayoutArea): IBoundable => {
  if (isScene(layoutArea)) {
    // Для Phaser.Scene возвращаем bounds камеры
    return {
      getBounds: () => {
        const camera = layoutArea.cameras.main;
        return new Phaser.Geom.Rectangle(0, 0, camera.width, camera.height);
      }
    };
  }

  if (isRectangle(layoutArea)) {
    // Для Phaser.Geom.Rectangle возвращаем сам прямоугольник
    return {
      getBounds: () => layoutArea
    };
  }

  if (hasGetBounds(layoutArea)) {
    // Для объектов с методом getBounds просто возвращаем их
    return layoutArea;
  }

  if (hasWidthHeight(layoutArea)) {
    // Для объектов с width/height создаём прямоугольник от (0,0)
    return {
      getBounds: () => new Phaser.Geom.Rectangle(0, 0, layoutArea.width, layoutArea.height)
    };
  }

// Этот случай не должен произойти с корректными типами TypeScript
  throw new Error("Неподдерживаемый тип LayoutArea");


};

