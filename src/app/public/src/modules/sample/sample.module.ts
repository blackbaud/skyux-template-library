import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrarySampleComponent } from './sample.component';
import { SkyAppRuntimeModule } from '@blackbaud/skyux-builder/runtime';

@NgModule({
  declarations: [
    LibrarySampleComponent
  ],
  imports: [
    CommonModule,
    SkyAppRuntimeModule
  ],
  exports: [
    LibrarySampleComponent
  ]
})
export class LibrarySampleModule { }
