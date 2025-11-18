import { BaseComponent } from '../common.js';

export class PageComponent extends BaseComponent<HTMLUListElement> {
  constructor() {
    const html = "<ul class='page'>This is PageComponent!</ul>";
    super(html);
  }
}