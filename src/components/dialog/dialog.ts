import { BaseComponent, type Component } from '../common.js';
import type { Composable } from '../page/page.js';

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export class InputDialog extends BaseComponent<HTMLElement> implements Composable {
  private closeListener?: OnCloseListener;
  private submitListener?: OnSubmitListener;

  constructor() {
    const html = `<section class="dialog">
      <div class="dialog-container">
        <button class="close">&times;</button>
        <div id="dialog-body"></div>
        <button class="dialog-submit">ADD</button>
      </div>
    </section>`;
    super(html);

    const closeButton = this.element.querySelector(".close")! as HTMLElement;
    closeButton.onclick = () => {
      this.closeListener && this.closeListener();
    };

    const submitButton = this.element.querySelector(".dialog-submit")! as HTMLElement;
    submitButton.onclick = () => {
      this.submitListener && this.submitListener();
    }
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }

  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListener = listener;
  }

  addChild(child: Component) {
    const body = this.element.querySelector("#dialog-body")! as HTMLElement;
    child.attachTo(body);
  }
}