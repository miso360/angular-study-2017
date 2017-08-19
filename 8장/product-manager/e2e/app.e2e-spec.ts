import { ProductManagerPage } from './app.po';

describe('product-manager App', () => {
  let page: ProductManagerPage;

  beforeEach(() => {
    page = new ProductManagerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
