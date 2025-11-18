import { BaseComponent } from '../../common.js';

export class TodoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, todo: string) {
    const html = `<section class="todo">
      <h2 class="todo-title"></h2>
      <input type="checkbox" class="todo-checkbox">
    </section>`;
    super(html);

    const titleElement = this.element.querySelector(".todo-title")! as HTMLHeadElement;
    titleElement.textContent = title;

    const todoElement = this.element.querySelector(".todo-checkbox")! as HTMLInputElement;
    todoElement.insertAdjacentText("afterbegin", todo);
  }
}