import { BaseComponent, type Component } from '../common.js';

export interface Composable {
  addChild(child: Component): void;
}
type OnCloseListener = () => void;
type DragState = "start" | "end" | "enter" | "leave";
type OnDragStateListener<T extends Component> = (target: T, state: DragState) => void;
type SectionContainerConstructor = {
  new (): SectionContainer;
}
interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
  setOnDragStateListener(listener: OnDragStateListener<SectionContainer>): void;
  muteChildren(state: "mute" | "unmute"): void;
}

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
  private closeListener?: OnCloseListener;
  private dragStateListener?: OnDragStateListener<PageItemComponent>;

  constructor() {
    const html = `<li draggable="true" class="page-item">
      <section class="page-item__body"></section>
      <div class="page-item__controls">
        <button class="close">&times;</button>
      </div>
    </li>`;
    super(html);

    const closeButton = this.element.querySelector(".close")! as HTMLButtonElement;
    closeButton.onclick = () => {
      this.closeListener && this.closeListener();
    };

    this.element.addEventListener("dragstart", (e: DragEvent) => {
      this.onDragStart(e);
    });
    this.element.addEventListener("dragend", (e: DragEvent) => {
      this.onDragEnd(e);
    });
    this.element.addEventListener("dragenter", (e: DragEvent) => {
      this.onDragEnter(e);
    });
    this.element.addEventListener("dragleave", (e: DragEvent) => {
      this.onDragLeave(e);
    });
  }

  onDragStart(_: DragEvent) {
    this.notifyDragObservers("start");
  }

  onDragEnd(_: DragEvent) {
    this.notifyDragObservers("end");
  }

  onDragEnter(_: DragEvent) {
    this.notifyDragObservers("enter");
  }

  onDragLeave(_: DragEvent) {
    this.notifyDragObservers("leave");
  }

  notifyDragObservers(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state);
  }

  addChild(child: Component) {
    const container = this.element.querySelector(".page-item__body")! as HTMLElement;
    child.attachTo(container);
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }

  setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>) {
    this.dragStateListener = listener;
  }

  muteChildren(state: "mute" | "unmute") {
    if(state === "mute") {
      this.element.classList.add("mute-children");
    }
    else {
      this.element.classList.remove("mute-children");
    }
  }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  private children = new Set<SectionContainer>();
  private dropTarget: SectionContainer | undefined;
  private dragTarget: SectionContainer | undefined;

  constructor(private pageItemContructor: SectionContainerConstructor) {
    const html = "<ul class='page'></ul>";
    super(html);

    this.element.addEventListener("dragover", (e: DragEvent) => {
      this.onDragOver(e);
    });
    this.element.addEventListener("drop", (e: DragEvent) => {
      this.onDrop(e);
    });
  }

  onDragOver(e: DragEvent) {
    e.preventDefault();

    console.log("over", e);
  }

  onDrop(e: DragEvent) {
    e.preventDefault();
    console.log("drop", e);

    // 여기에서 위치 바꿔주기
    if(!this.dropTarget) return;
    if(this.dragTarget && this.dragTarget !== this.dropTarget) {
      this.dragTarget.removeFrom(this.element);
      this.dropTarget.attach(this.dragTarget, "beforebegin");
    }
  }

  addChild(section: Component) {
    const item = new this.pageItemContructor();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
      this.children.delete(item);
    });
    this.children.add(item);
    item.setOnDragStateListener((target: SectionContainer, state: DragState) => {
      switch(state) {
        case "start":
          this.dragTarget = target;
          this.updateSections("mute");
          break;
        case "end":
          this.dragTarget = undefined;
          this.updateSections("unmute");
          break;
        case "enter":
          this.dropTarget = target;
          break;
        case "leave":
          this.dropTarget = undefined;
          break;
        default:
          throw new Error(`unsupported state: ${state}`);
      }
    });
  }

  private updateSections(state: "mute" | "unmute") {
    this.children.forEach((section: SectionContainer) => {
      section.muteChildren(state);
    });
  }
}