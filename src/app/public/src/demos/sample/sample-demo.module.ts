import {
  NgModule
} from '@angular/core';

import {
  MyLibrarySampleModule
} from '../../modules/sample';

import {
  MyLibrarySampleDemoComponent
} from './sample-demo.component';

import {
  MyLibrarySampleDemoService
} from './sample-demo.service';

@NgModule({
  declarations: [
    MyLibrarySampleDemoComponent
  ],
  imports: [
    MyLibrarySampleModule
  ],
  exports: [
    MyLibrarySampleDemoComponent
  ],
  providers: [
    MyLibrarySampleDemoService
  ]
})
export class MyLibrarySampleDemoModule { }
