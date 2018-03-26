import {
  NgModule
} from '@angular/core';

/**
 * Type `skyux build-public-library`
 * Move dist folder to node_modules/@blackbaud
 * Type `skyux build -s`
 */
import {
  LibraryModule
} from '@blackbaud/dist';

// Specify entry components, module-level providers, etc. here.
@NgModule({
  imports: [
    LibraryModule
  ],
  exports: [
    LibraryModule
  ]
})
export class AppExtrasModule { }
