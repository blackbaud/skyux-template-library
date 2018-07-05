import {
  NgModule
} from '@angular/core';

import {
  MySampleModule
} from '../../modules/sample';

import {
  MySampleDemoComponent
} from './sample-demo.component';

import {
  MySampleDemoService
} from './sample-demo.service';

@NgModule({
  declarations: [
    MySampleDemoComponent
  ],
  imports: [
    MySampleModule
  ],
  exports: [
    MySampleDemoComponent
  ],
  providers: [
    MySampleDemoService
  ]
})
export class MySampleDemoModule { }
