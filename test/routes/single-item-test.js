const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('creates an Item and seeds to database', () => {
    it('rendered item contains title and description', async () => {
      // Setup
      const createdTestItem = await seedItemToDatabase();
      const testItemUrl = '/items/' + createdTestItem._id;
      const response = await request(app)
        .get(testItemUrl);

      assert.include(parseTextFromHTML(response.text, '#item-title'), createdTestItem.title);
      assert.include(parseTextFromHTML(response.text, '#item-description'), createdTestItem.description);
    });
  });
});
