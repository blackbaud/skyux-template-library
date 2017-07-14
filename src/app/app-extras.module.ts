import { NgModule } from '@angular/core';

import { LibraryModule } from './public';

// Specify entry components, module-level providers, etc. here.
@NgModule({
  imports: [
    LibraryModule
  ],
  exports: [
    LibraryModule
  ],
  entryComponents: []
})
export class AppExtrasModule { }
