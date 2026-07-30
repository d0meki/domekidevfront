import { Gif } from "@app/features/curso-fernando-h/interfaces/gif.interface";
import { GiphyItem } from "@app/features/curso-fernando-h/interfaces/giphy.interface";


export class GifMapper {
  static mapGiphyItemToGif(item: GiphyItem): Gif {
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url,
    };
  }

  static mapGiphyItemsToGifArray(items: GiphyItem[]): Gif[] {
    return items.map(this.mapGiphyItemToGif);
  }
}
