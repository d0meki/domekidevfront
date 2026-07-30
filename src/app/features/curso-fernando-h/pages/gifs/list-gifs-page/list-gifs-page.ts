import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ScrollStateService } from '@app/shared/services/scroll-state.service';
import { GifsService } from '@app/features/curso-fernando-h/services/gifs.service';
@Component({
  selector: 'app-list-gifs-page',
  template: `<!-- <section class="py-5">
  <gif-list [gifs]="gifService.trendingGifs()" />
</section> -->

    <div
      class="h-screen overflow-y-scroll grid grid-cols-2 md:grid-cols-4 gap-4 pt-5"
      #groupDiv
      (scroll)="onScroll($event)"
    >
      @for (group of gifService.trendingGifGroup(); track $index) {
        <div class="grid gap-4">
          @for (gif of group; track gif.id) {
            <div>
              <img
                class="h-full w-full rounded-lg object-cover"
                [src]="gif.url"
                [alt]="gif.title"
              />
            </div>
          }
        </div>
      }
    </div>`,
  styleUrl: './list-gifs-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListGifsPage implements AfterViewInit {
  gifService = inject(GifsService);
  scrollStateService = inject(ScrollStateService);
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    // console.log({ scrollTotal: scrollTop + clientHeight, scrollHeight });
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    this.scrollStateService.trendingScrollState.set(scrollTop);

    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
  }
}
