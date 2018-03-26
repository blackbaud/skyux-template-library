import {
  Component
} from '@angular/core';

import {
  SkyErrorModalService
} from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'lib-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss'],
  providers: [SkyErrorModalService]
})
export class LibrarySampleComponent {
  constructor(
    private errorService: SkyErrorModalService
  ) { }

  public openModal() {
    this.errorService.open({
      errorTitle: 'Some title',
      errorDescription: 'Some description',
      errorCloseText: 'Close'
    });
  }
}
