import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  SkyModalModule
} from '@blackbaud/skyux/dist/core';

import { LibrarySampleComponent } from './sample.component';
import { LibrarySampleModalComponent } from './sample-modal.component';

@NgModule({
  declarations: [
    LibrarySampleComponent,
    LibrarySampleModalComponent
  ],
  imports: [
    CommonModule,
    SkyModalModule
  ],
  exports: [
    LibrarySampleComponent
  ],
  entryComponents: [
    LibrarySampleModalComponent
  ]
})
export class LibrarySampleModule { }
