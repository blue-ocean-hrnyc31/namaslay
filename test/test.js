const puppeteer = require('puppeteer');
const path = require('path');
const request = require('supertest');

describe('Home Page', () => {
  const host = 'http://127.0.0.1:9000';
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(host);

    // page.on('console', (msg) => {
    //   console.log('msg:', msg);
    //   if (msg.type() === 'error') {
    //     console.log('console msg:', msg.text());
    //   }
    // });
  });

  afterEach(async () => {
    await page.close();
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should render two links in the home page', async () => {
    const links = await page.$$('a');
    //console.log(links.length);
    expect(links.length).toBe(9);
  });
});

describe('Database', () => {
  const host = 'http://34.229.137.235:4444';

  it('should return an object when getting /countPracticing', () => {
    return request(host)
      .get('/countPracticing')
      .expect(200)
      .then(({ body }) => {
        //console.log('body:', body);
        expect(body[0]).toHaveProperty('count');
      });
  });
});
