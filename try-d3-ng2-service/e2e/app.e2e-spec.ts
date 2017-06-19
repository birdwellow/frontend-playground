import { TryD3Ng2ServicePage } from './app.po';

describe('try-d3-ng2-service App', () => {
  let page: TryD3Ng2ServicePage;

  beforeEach(() => {
    page = new TryD3Ng2ServicePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
