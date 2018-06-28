import {
  Injectable
} from '@angular/core';

@Injectable()
export class MyLibrarySampleDemoService {
  public files: {
    name: string;
    contents: string;
  }[] = [
    {
      name: 'sample-demo.component.html',
      contents: require('./sample-demo.component.html')
    }
  ];
}
