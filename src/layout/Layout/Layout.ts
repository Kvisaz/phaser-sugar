import { LayoutArea } from "../LayoutArea/types";
import { ArrayAlignCallback, ILayoutTarget } from "../arrayAlign/types";
import { arrayAlign } from "../arrayAlign";
import { IBoundable } from "../types";
import { getLayoutToBounds } from "../LayoutArea";
import { Align } from "../Align/Align";

enum SideBarType {
  LEFT,
  RIGHT,
  TOP,
  BOTTOM,
}

const sideBarMap: Record<SideBarType, ArrayAlignCallback> = {
  [SideBarType.TOP]: arrayAlign.row,
  [SideBarType.BOTTOM]: arrayAlign.row,
  [SideBarType.LEFT]: arrayAlign.column,
  [SideBarType.RIGHT]: arrayAlign.column
};

interface IProps {
  layoutArea: LayoutArea;
}

interface ILayout {
  sidebarLeft: ArrayAlignCallback;
  sidebarRight: ArrayAlignCallback;
  sidebarTop: ArrayAlignCallback;
  sidebarBottom: ArrayAlignCallback;
  center: ArrayAlignCallback;
}

const CENTER = -16323;

/** Возвращает методы для макетирования **/
export class Layout implements ILayout {
  private areaAnchor: IBoundable;
  private align: Align;

  constructor(private props: IProps) {
    this.areaAnchor = this.resize();
    this.align = new Align(this.areaAnchor);
  }

  resize() {
    this.areaAnchor = getLayoutToBounds(this.props.layoutArea);
    return this.areaAnchor;
  }

  sidebarLeft<T extends ILayoutTarget>(objects: T[], offsetX = 0, offsetY = CENTER): T[] {
    const row = arrayAlign.column(objects);
    const movable = arrayAlign.alignObject(row);
    if (offsetY === CENTER) {
      this.align.leftIn(movable, offsetX).centerY(movable, 0);
    } else {
      this.align.leftIn(movable, offsetX).topIn(movable, offsetY);
    }
    return objects;
  }

  sidebarRight<T extends ILayoutTarget>(objects: T[], offsetX = 0, offsetY = CENTER): T[] {
    const row = arrayAlign.column(objects);
    const movable = arrayAlign.alignObject(row);
    if (offsetY === CENTER) {
      this.align.rightIn(movable, offsetX).centerY(movable, 0);
    } else {
      this.align.rightIn(movable, offsetX).topIn(movable, offsetY);
    }
    return objects;
  }

  sidebarTop<T extends ILayoutTarget>(objects: T[], offsetX = CENTER, offsetY = 0): T[] {
    const row = arrayAlign.row(objects);
    const movable = arrayAlign.alignObject(row);
    if (offsetX === CENTER) {
      this.align.centerX(movable, 0).topIn(movable, offsetY);
    } else {
      this.align.leftIn(movable, offsetX).topIn(movable, offsetY);
    }
    return objects;
  }

  sidebarBottom<T extends ILayoutTarget>(objects: T[], offsetX = CENTER, offsetY = 0): T[] {
    const row = arrayAlign.row(objects);
    const movable = arrayAlign.alignObject(row);
    if (offsetX === CENTER) {
      this.align.centerX(movable, 0).bottomIn(movable, offsetY);
    } else {
      this.align.leftIn(movable, offsetX).bottomIn(movable, offsetY);
    }
    return objects;
  }

  center<T extends ILayoutTarget>(objects: T[], offsetX = 0, offsetY = 0): T[] {
    const movable = arrayAlign.alignObject(objects);
    this.align.center(movable, offsetX);
    return objects;
  }
}
