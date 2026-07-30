import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
// import { GifsService } from '@app/gifs/services/gifs.service';
import { map } from 'rxjs';
// import { GifList } from '@app/gifs/components/gif-list/gif-list';

@Component({
  selector: 'app-gif-history',
  // imports: [GifList],
  template: `<h3 class="text-2xl font-bold mt-4">Mostrando: {{ query() }}</h3>
    <hr />
    <section class="py-5">
      <!-- <app-gif-list [gifs]="gifsByKey()" /> -->
    </section>`,
  styleUrl: './gif-history.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GifHistory {
  // gifService = inject(GifsService);

  query = toSignal(inject(ActivatedRoute).params.pipe(map((params) => params['query'])));
  // query = inject(ActivatedRoute).params.subscribe((params) => {
  //   console.log({ params });
  // });

  // gifsByKey = computed(() => this.gifService.getHistoryGifs(this.query()));
}
