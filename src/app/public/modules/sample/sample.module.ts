import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  MySampleComponent
} from './sample.component';

import {
  MySampleService
} from './sample.service';

@NgModule({
  declarations: [
    MySampleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MySampleComponent
  ],
  providers: [
    MySampleService
  ]
})
export class MySampleModule { }
