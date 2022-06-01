import { EhealthPage } from './app.po';

describe('ehealth App', () => {
  let page: EhealthPage;

  beforeEach(() => {
    page = new EhealthPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
