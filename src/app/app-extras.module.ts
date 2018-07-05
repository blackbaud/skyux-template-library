import {
  NgModule
} from '@angular/core';

import {
  MySampleDemoModule
} from './public/demos';

// Specify entry components, module-level providers, etc. here.
@NgModule({
  imports: [
    MySampleDemoModule
  ],
  exports: [
    MySampleDemoModule
  ],
  providers: [],
  entryComponents: []
})
export class AppExtrasModule { }
