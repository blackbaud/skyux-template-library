import { NgModule } from '@angular/core';

import { SkyAppConfig } from '@blackbaud/skyux-builder/runtime';

import { MyConfigService } from './public/src/my-library/my-library.module';

// Specify entry components, module-level providers, etc. here.
@NgModule({
  providers: [
    {
      provide: MyConfigService,
      useExisting: SkyAppConfig
    }
  ],
  entryComponents: []
})
export class AppExtrasModule { }
