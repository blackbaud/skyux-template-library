import {
  Component
} from '@angular/core';

import {
  MyLibrarySampleDemoService
} from '../../public/src/demos';

@Component({
  selector: 'lib-sample-visual',
  templateUrl: './sample-visual.component.html'
})
export class MyLibSampleVisualComponent {
  constructor(
    public demoService: MyLibrarySampleDemoService
  ) { }
}
