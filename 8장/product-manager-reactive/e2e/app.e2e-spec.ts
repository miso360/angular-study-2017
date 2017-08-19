import { ProductManagerReactivePage } from './app.po';

describe('product-manager-reactive App', () => {
  let page: ProductManagerReactivePage;

  beforeEach(() => {
    page = new ProductManagerReactivePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
