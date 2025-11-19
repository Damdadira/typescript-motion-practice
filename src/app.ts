import type { Component } from './components/common.js';
import { InputDialog, type MediaData, type TextData } from './components/dialog/dialog.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { TextSectionInput } from './components/dialog/input/text-input.js';
import { ImageComponent } from './components/page/item/image.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';
import { PageComponent, PageItemComponent, type Composable } from "./components/page/page.js";

type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
  new (): T;
}

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    // const image = new ImageComponent("Image Title", "https://picsum.photos/600/300");
    // this.page.addChild(image);
    
    // const video = new VideoComponent("Video Title", "https://www.youtube.com/embed/JVIKowQZEdk?list=RDYyKSZARBcGo");
    // this.page.addChild(video);

    // const note = new NoteComponent("Note Title", "Note Body");
    // this.page.addChild(note);

    // const todo = new TodoComponent("Todo Title", "Todo Item");
    // this.page.addChild(todo);

    // image
    this.bindElementToDialog<MediaSectionInput>(
      "#new-image", 
      MediaSectionInput, 
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url)
    );

    // video
    this.bindElementToDialog<MediaSectionInput>(
      "#new-video", 
      MediaSectionInput, 
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
    );

    // note
    this.bindElementToDialog<TextSectionInput>(
      "#new-note", 
      TextSectionInput, 
      (input: TextSectionInput) => new NoteComponent(input.title, input.body)
    );
    
    // todo
    this.bindElementToDialog<TextSectionInput>(
      "#new-todo", 
      TextSectionInput, 
      (input: TextSectionInput) => new TodoComponent(input.title, input.body)
    );
  }

  private bindElementToDialog<T extends (MediaData | TextData) & Component>(
    selector: string, 
    InputComponent: InputComponentConstructor<T>,
    makeSection: (input: T) => Component,
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    element.addEventListener("click", () => {
      const dialog = new InputDialog();
      const input = new InputComponent();
      dialog.addChild(input);
      dialog.attachTo(this.dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });
      dialog.setOnSubmitListener(() => {
        const image = makeSection(input);
        this.page.addChild(image);
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}
new App(document.querySelector(".document")! as HTMLElement, document.body);