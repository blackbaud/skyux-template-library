import {
  Injectable
} from '@angular/core';

import {
  SkyErrorModalService
} from '@blackbaud/skyux/dist/core';

@Injectable()
export class LibrarySampleService {
  constructor(
    private errorService: SkyErrorModalService
  ) { }

  public launchError(message: string) {
    this.errorService.open({
      errorTitle: message,
      errorDescription: 'Some description',
      errorCloseText: 'Close'
    });
  }
}
