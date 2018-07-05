import {
  Injectable
} from '@angular/core';

import {
  SkyAppConfig
} from '@blackbaud/skyux-builder/runtime';

@Injectable()
export class MySampleService {
  public appSettings: any;

  constructor(
    private appConfig: SkyAppConfig
  ) {
    this.appSettings = this.appConfig.skyux.appSettings;
  }
}
