export class ImageComponent {
  private element: HTMLElement;
  constructor(title: string, url: string) {
    const template = document.createElement("template");
    template.innerHTML = `<section class="image">
        <div class="image-holder"><img class="image-thumbnail"></div>
        <p class="image-title"></p>
      </section>`;

    this.element = template.content.firstElementChild! as HTMLElement;
    const imageElement = this.element.querySelector(".image-thumbnail")! as HTMLImageElement;
    imageElement.src = url;
    imageElement.alt = title;
    const titleElement = this.element.querySelector(".image-title")! as HTMLParagraphElement;
    titleElement.textContent = title;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin") {
    parent.insertAdjacentElement(position, this.element);
  }
}