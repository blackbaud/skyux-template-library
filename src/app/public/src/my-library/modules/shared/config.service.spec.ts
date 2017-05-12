import { MyConfigService } from './index';

describe('MyConfigService', () => {
  it('should return configuration', () => {
    const configService = new MyConfigService();
    expect(configService.skyux.app.title).toBe('');
  });
});
