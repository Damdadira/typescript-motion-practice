import { BaseComponent } from '../../common.js';

export class NoteComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, body: string) {
    const html = `<section class="note">
      <h2 class="page-item__title note-title"></h2>
      <p class="note-body"></p>
    </section>`;
    super(html);

    const titleElement = this.element.querySelector(".note-title")! as HTMLHeadElement;
    titleElement.textContent = title;
    
    const bodyElement = this.element.querySelector(".note-body")! as HTMLParagraphElement;
    bodyElement.textContent = body;
  }
}