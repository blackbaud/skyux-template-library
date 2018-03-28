import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'skyAppResources'
})
export class MockSkyAppResourcesPipe implements PipeTransform {
  public transform(value: string): string {
    return value;
  }
}
