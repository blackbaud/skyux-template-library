import {
  Injectable
} from '@angular/core';

import {
  SkyDemoFile
} from '../demo-file';

@Injectable()
export class MySampleDemoService {
  public files: SkyDemoFile[] = [
    {
      fileName: 'sample-demo.component.html',
      contents: require('!!raw-loader!./sample-demo.component.html')
    },
    {
      fileName: 'sample-demo.component.scss',
      contents: require('!!raw-loader!./sample-demo.component.scss')
    },
    {
      fileName: 'sample-demo.component.ts',
      contents: require('!!raw-loader!./sample-demo.component.ts')
    },
    {
      fileName: 'sample-demo.module.ts',
      contents: require('!!raw-loader!./sample-demo.module.ts'),
      moduleName: 'MySampleDemoModule'
    }
  ].map((file) => {
    file.contents = file.contents.replace(
      /\'\.\.\/\.\./g,
      '\'@blackbaud/skyux-core'
    );
    return file;
  });
}
