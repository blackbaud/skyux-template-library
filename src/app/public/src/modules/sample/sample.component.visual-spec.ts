import {
  SkyHostBrowser,
  SkyVisualTest
} from '@blackbaud/skyux-builder/runtime/testing/e2e';

describe('Sample component', () => {
  beforeEach(() => {
    SkyHostBrowser.get('/');
  });

  it('should match previous screenshot', () => {
    SkyVisualTest.compareScreenshot({
      screenshotName: 'sample'
    });
  });

  it('should match previous screenshot on tiny screens', () => {
    SkyVisualTest.compareScreenshot({
      screenshotName: 'sample-xs',
      breakpoint: 'xs'
    });
  });
});
