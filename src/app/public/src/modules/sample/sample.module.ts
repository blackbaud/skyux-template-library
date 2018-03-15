import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyAppRuntimeModule } from '@blackbaud/skyux-builder/runtime/runtime.module';

import { LibrarySampleComponent } from './sample.component';

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
