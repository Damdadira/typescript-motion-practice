import type { Draggable, Droppable, Hoverable } from "../components/common/type";
import type { Component } from '../components/common';

type GConstructor<T = {}> = new (...args: any[]) => T;
type DraggableClass = GConstructor<Component & Draggable>;

export function EnableDragging<TBase extends DraggableClass>(Base: TBase) {
  return class DraggableItem extends Base {
    constructor(...args: any[]) {
      super(...args);
      this.registerEventListener("dragstart", (e: DragEvent) => {
        this.onDragStart(e);
      });
      this.registerEventListener("dragend", (e: DragEvent) => {
        this.onDragEnd(e);
      });
    }
  }
}

type DragHoverClass = GConstructor<Component & Hoverable>;

export function EnableHover<TBase extends DragHoverClass>(Base: TBase) {
  return class DragHoverArea extends Base {
    constructor(...args: any[]) {
      super(...args);
      this.registerEventListener("dragenter", (e: DragEvent) => {
        e.preventDefault();
        this.onDragEnter(e);
      });
      this.registerEventListener("dragleave", (e: DragEvent) => {
        this.onDragLeave(e);
      });
    }
  }
}

type DropTargetClass = GConstructor<Component & Droppable>;

export function EnableDrop<TBase extends DropTargetClass>(Base: TBase) {
  return class DropArea extends Base {
    constructor(...args: any[]) {
      super(...args);
      this.registerEventListener("dragover", (e: DragEvent) => {
        e.preventDefault();
        this.onDragOver(e);
      });
      this.registerEventListener("drop", (e: DragEvent) => {
        e.preventDefault();
        this.onDrop(e);
      });
    }
  }
}