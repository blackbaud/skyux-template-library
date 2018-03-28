import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SkyAppRuntimeModule
} from '@blackbaud/skyux-builder/runtime/runtime.module';

import { MyLibrarySampleComponent } from './sample.component';

@NgModule({
  declarations: [
    MyLibrarySampleComponent
  ],
  imports: [
    CommonModule,
    SkyAppRuntimeModule
  ],
  exports: [
    MyLibrarySampleComponent
  ]
})
export class MyLibrarySampleModule { }
