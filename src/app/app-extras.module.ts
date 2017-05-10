import { NgModule } from '@angular/core';

import { MyModule } from './dist/bundles/main.umd.js';

// Specify entry components, module-level providers, etc. here.
@NgModule({
  imports: [MyModule],
  exports: [MyModule],
  providers: [],
  entryComponents: []
})
export class AppExtrasModule { }
