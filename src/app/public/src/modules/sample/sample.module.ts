import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  SkyModalModule,
  SkyErrorModule
} from '@blackbaud/skyux/dist/core';

import { LibrarySampleComponent } from './sample.component';

@NgModule({
  declarations: [
    LibrarySampleComponent
  ],
  imports: [
    CommonModule,
    SkyModalModule,
    SkyErrorModule
  ],
  exports: [
    LibrarySampleComponent
  ]
})
export class LibrarySampleModule { }
