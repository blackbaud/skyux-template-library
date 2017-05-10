import { Component } from '@angular/core';

@Component({
  selector: 'foo-bar',
  template: `<div class="foo">
  Hello, World!
</div>
`,
  styles: [`.foo{color:red}
`]
})
export class FooComponent { }
