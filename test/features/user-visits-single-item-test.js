const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('user visits /create and makes a new item', () => {
  describe('item is submitted', () => {
    it('is rendered in single item view', () => {
      // Setup
      const itemToCreate = buildItemObject();
      browser.url('/');
      browser.click('a[href="/items/create"]');
      browser.setValue('#title-input', itemToCreate.title);
      browser.setValue('#description-input', itemToCreate.description);
      browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
      browser.click('#submit-button');
      browser.click('.item-card a');
      assert.include(browser.getText('body'), itemToCreate.title);
    });
  });
});
