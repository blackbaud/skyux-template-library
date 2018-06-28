import {
  NgModule
} from '@angular/core';

import {
  MyLibrarySampleDemoModule
} from './public/src/demos';

// Specify entry components, module-level providers, etc. here.
@NgModule({
  imports: [
    MyLibrarySampleDemoModule
  ],
  exports: [
    MyLibrarySampleDemoModule
  ],
  providers: [],
  entryComponents: []
})
export class AppExtrasModule { }
