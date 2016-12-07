import { TodayTest06Page } from './app.po';

describe('today-test06 App', function() {
  let page: TodayTest06Page;

  beforeEach(() => {
    page = new TodayTest06Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
