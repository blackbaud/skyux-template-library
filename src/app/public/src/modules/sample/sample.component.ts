import {
  Component
} from '@angular/core';

import {
  SkyModalService
} from '@blackbaud/skyux/dist/core';

import { LibrarySampleModalComponent } from './sample-modal.component';

@Component({
  selector: 'lib-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class LibrarySampleComponent {
  constructor(
    private modalService: SkyModalService
  ) { }

  public openModal() {
    this.modalService.open(LibrarySampleModalComponent);
  }
}
