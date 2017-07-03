import { NgModule } from '@angular/core';
import { SkyAppConfig } from '@blackbaud/skyux-builder/runtime';
import { LibraryConfigService } from './public';

// Specify entry components, module-level providers, etc. here.
@NgModule({
  providers: [
    {
      provide: LibraryConfigService,
      useExisting: SkyAppConfig
    }
  ],
  entryComponents: []
})
export class AppExtrasModule { }
