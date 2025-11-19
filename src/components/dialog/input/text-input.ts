import { BaseComponent } from '../../common.js';

export class TextSectionInput extends BaseComponent<HTMLElement> {
  constructor() {
    const html = `<div>
      <div class="form-container">
        <label for="title">Title</label>
        <input type="text" id="title">
      </div>
      <div class="form-container">
        <label for="body">Body</label>
        <textarea type="text" row="3" id="body"></textarea>
      </div>
    </div>`;
    super(html);
  }

  get title(): string {
    const element = this.element.querySelector("#title")! as HTMLInputElement;
    return element.value;
  }
  get body(): string {
    const element = this.element.querySelector("#body")! as HTMLTextAreaElement;
    return element.value;
  }
}