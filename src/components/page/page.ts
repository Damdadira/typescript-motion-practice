import { BaseComponent, type Component } from '../common.js';

export interface Composable {
  addChild(child: Component): void;
}
class PageItemComponent extends BaseComponent<HTMLElement> implements Composable {
  constructor() {
    const html = `<li class="page-item">
      <section class="page-item__body"></section>
      <div class="page-item__controls">
        <button class="close">&times;</button>
      </div>
    </li>`;
    super(html);
  }

  addChild(child: Component) {
    const container = this.element.querySelector(".page-item__body")! as HTMLElement;
    child.attachTo(container);
  }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  constructor() {
    const html = "<ul class='page'></ul>";
    super(html);
  }

  addChild(section: Component) {
    const item = new PageItemComponent();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
  }
}