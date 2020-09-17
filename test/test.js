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
    console.log(links.length);
    expect(links.length).toBe(9);
  });
});
