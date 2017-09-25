import { SimpleCommerceManagerPage } from './app.po';

describe('simple-commerce-manager App', () => {
  let page: SimpleCommerceManagerPage;

  beforeEach(() => {
    page = new SimpleCommerceManagerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to scm!');
  });
});
