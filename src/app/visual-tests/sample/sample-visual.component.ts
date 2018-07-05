import {
  Component
} from '@angular/core';

import {
  MySampleDemoService
} from '../../public/demos';

@Component({
  selector: 'lib-sample-visual',
  templateUrl: './sample-visual.component.html'
})
export class MyLibSampleVisualComponent {
  constructor(
    public demoService: MySampleDemoService
  ) { }
}
