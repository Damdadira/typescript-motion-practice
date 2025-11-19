import { BaseComponent } from '../../common.js';

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    const html = `<section class="video">
      <div class="video-player">
        <iframe src="" frameborder="0" class="video-iframe"></iframe>
      </div>
      <h3 class="page-item__title video-title"></h3>
    </section>`;
    super(html);

    const iframeElement = this.element.querySelector(".video-iframe")! as HTMLIFrameElement;
    iframeElement.src = this.convertToEmbeddedURL(url)  // url -> videoId

    const titleElement = this.element.querySelector(".video-title")! as HTMLHeadingElement;
    titleElement.textContent = title;
  }

  // 정규표현식 Regex
  private convertToEmbeddedURL(url: string): string {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    const match = url.match(regExp);

    const videoId = match ? match[1] || match[2] : undefined;
    if(videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
}