import {
  Component
} from '@angular/core';

import { LibrarySampleService } from './sample.service';

@Component({
  selector: 'lib-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss'],
  providers: [LibrarySampleService]
})
export class LibrarySampleComponent {
  constructor(
    private libService: LibrarySampleService
  ) { }

  public openModal() {
    this.libService.launchError('Something bad happened.');
  }
}
