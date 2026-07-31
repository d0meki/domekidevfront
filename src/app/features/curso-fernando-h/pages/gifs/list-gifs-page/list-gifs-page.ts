import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ScrollStateService } from '@app/shared/services/scroll-state.service';
import { GifsService } from '@app/features/curso-fernando-h/services/gifs.service';
import { GifList } from '@app/features/curso-fernando-h/components/gif-list/gif-list';
import { Gif } from '@app/features/curso-fernando-h/interfaces/gif.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { map } from 'rxjs';
import { BadgeComponent } from '@app/shared/ui/badge/badge.component';
@Component({
  selector: 'app-list-gifs-page',
  template: `
    <h2 class="text-2xl font-bold mt-5">Buscar Gifs</h2>
    <h3 class="text-sm text-gray-500">Buscar gifs por nombre, descripción o tags</h3>

    <section class="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Buscar Gifs"
        class="mt-3 border border-gray-300 rounded-md p-2"
        (keyup.enter)="onSearch(txtSearch.value)"
        #txtSearch
      />
    </section>
    <div class="flex flex-wrap gap-2 mt-2">
      <h4>{{ gifService.searchHistoryKeys().length > 0 ? 'Historial:' : '' }}</h4>
      @for (item of gifService.searchHistoryKeys(); track item) {
        <a [routerLink]="['/bases/gifs', item]">
          <app-badge>{{ item }}</app-badge>
        </a>
      }
    </div>

    <h3 class="text-2xl font-bold mt-4">
      Mostrando: {{ query() !== 'null' ? query() : 'Trending' }}
    </h3>
    <hr />
    @if (initPage()) {
      <div
        class="h-screen overflow-y-scroll grid grid-cols-2 md:grid-cols-4 gap-4 pt-5 mt-2"
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
      </div>
    } @else {
      <div class="py-5">
        <app-gif-list [gifs]="gifs()" />
      </div>
    } `,
  styleUrl: './list-gifs-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GifList, BadgeComponent, RouterModule],
})
export default class ListGifsPage implements AfterViewInit {
  gifService = inject(GifsService);
  scrollStateService = inject(ScrollStateService);
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');
  initPage = signal(true);
  gifs = signal<Gif[]>([]);
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onSearch(query: string) {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return;

    void this.router.navigate(['/bases/gifs', normalizedQuery]);
  }
  // query = toSignal(inject(ActivatedRoute).params.pipe(map((params) => params['query'])));
  readonly query = toSignal(this.route.paramMap.pipe(map((params) => params.get('query') ?? '')), {
    initialValue: '',
  });
  // gifsByKey = computed(() => this.gifService.getHistoryGifs(this.query()));
  constructor() {
    effect(() => {
      const query = this.query().trim().toLowerCase();

      if (!query || query === 'null') {
        this.initPage.set(true);
        this.gifs.set([]);
        return;
      }

      this.initPage.set(false);
      const isCached = this.gifService.hasHistoryGifs(query);

      if (isCached) {
        this.gifs.set(this.gifService.getHistoryGifs(query));
        return;
      }

      this.gifService.searchGifs(query).subscribe((gifs) => {
        this.gifs.set(gifs);
      });
    });
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
