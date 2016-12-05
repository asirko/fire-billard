import { FireBillardPage } from './app.po';

describe('fire-billard App', function() {
  let page: FireBillardPage;

  beforeEach(() => {
    page = new FireBillardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
