import { SimpleCommerceManagerPage } from './app.po';

describe('simple-commerce-manager App', () => {
  let page: SimpleCommerceManagerPage;

  beforeEach(() => {
    page = new SimpleCommerceManagerPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to scm!!'))
      .then(done, done.fail);
  });
});
