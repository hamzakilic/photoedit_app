import { WjimgPage } from './app.po';

describe('wjimg App', () => {
  let page: WjimgPage;

  beforeEach(() => {
    page = new WjimgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
