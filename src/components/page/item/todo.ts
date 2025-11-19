import { BaseComponent } from '../../common.js';

export class TodoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, todo: string) {
    const html = `<section class="todo">
      <h2 class="page-item__title todo-title"></h2>
      <input type="checkbox" class="todo-checkbox">
      <label for="todo-checkbox" class="todo-label"></label>
    </section>`;
    super(html);

    const titleElement = this.element.querySelector(".todo-title")! as HTMLHeadElement;
    titleElement.textContent = title;

    const todoElement = this.element.querySelector(".todo-label")! as HTMLLabelElement;
    todoElement.textContent = todo;
  }
}