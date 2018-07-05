import {
  Component
} from '@angular/core';

import {
  MySampleService
} from '../../modules';

@Component({
  selector: 'lib-sample-demo',
  templateUrl: './sample-demo.component.html',
  styleUrls: ['./sample-demo.component.scss']
})
export class MySampleDemoComponent {
  constructor(
    private sampleService: MySampleService
  ) {
    console.log('Settings:', this.sampleService.appSettings);
  }
}
