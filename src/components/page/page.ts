import { BaseComponent, type Component } from '../common.js';

export interface Composable {
  addChild(child: Component): void;
}
type OnCloseListener = () => void;
type SectionContainerConstructor = {
  new (): SectionContainer;
}
interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
}

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
  private closeListener?: OnCloseListener;

  constructor() {
    const html = `<li class="page-item">
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
  }

  addChild(child: Component) {
    const container = this.element.querySelector(".page-item__body")! as HTMLElement;
    child.attachTo(container);
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  constructor(private pageItemContructor: SectionContainerConstructor) {
    const html = "<ul class='page'></ul>";
    super(html);
  }

  addChild(section: Component) {
    const item = new this.pageItemContructor();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
    });
  }
}