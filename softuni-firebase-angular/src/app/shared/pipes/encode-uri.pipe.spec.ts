import { EncodeUriPipe } from './encode-uri.pipe';

describe('EncodeUriPipe', () => {
  it('create an instance', () => {
    const pipe = new EncodeUriPipe();
    expect(pipe).toBeTruthy();
  });
});
