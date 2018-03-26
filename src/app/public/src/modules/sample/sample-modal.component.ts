import {
  Component
} from '@angular/core';

import {
  SkyModalInstance
} from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'lib-sample-modal',
  templateUrl: 'sample-modal.component.html'
})
export class LibrarySampleModalComponent {
  constructor(
    private instance: SkyModalInstance
  ) { }

  public closeModal() {
    this.instance.close();
  }
}
