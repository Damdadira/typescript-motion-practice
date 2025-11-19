import { BaseComponent } from '../../common.js';

export class MediaSectionInput extends BaseComponent<HTMLElement> {
  constructor() {
    const html = `<div>
      <div class="form-container">
        <label for="title">Title</label>
        <input type="text" id="title">
      </div>
      <div class="form-container">
        <label for="url">URL</label>
        <input type="text" id="url">
      </div>
    </div>`;
    super(html);
  }

  get title(): string {
    const element = this.element.querySelector("#title")! as HTMLInputElement;
    return element.value;
  }
  get url(): string {
    const element = this.element.querySelector("#url")! as HTMLInputElement;
    return element.value;
  }
}