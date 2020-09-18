# Namaslay

We are go for launch: http://go-with-the-flow.herokuapp.com/
[![Build Status](https://travis-ci.com/blue-ocean-hrnyc31/namaslay-client.svg?branch=master)](https://travis-ci.com/blue-ocean-hrnyc31/namaslay-client)
[![GitHub contributors](https://img.shields.io/github/contributors/blue-ocean-hrnyc31/namaslay-client)](https://github.com/blue-ocean-hrnyc31/namaslay-client/edit/master/README.md)
[![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/blue-ocean-hrnyc31/namaslay-client)](https://github.com/blue-ocean-hrnyc31/namaslay-client/pulls)
[![Heroku](https://pyheroku-badge.herokuapp.com/?app=go-with-the-flow&style=flat)](http://go-with-the-flow.herokuapp.com/)
[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://github.com/blue-ocean-hrnyc31/namaslay-client)

## Clone the Repo

```
git clone https://github.com/blue-ocean-hrnyc31/namaslay-client.git
```

## Development

1.  Install the dependencies:

```
npm install
```

2.  Create a .env file in the project's root directory with the appropriate information

3.  Start the server:

```
npm start
```

4.  Start the webpack development server and build the development bundle:

```
npm run build-dev
```

5.  Navigate to http://localhost:9000

6.  Pop those bottles!

---

### Notes

By leveraging Webpack's hot module replacement, any changes to the client code will be automatically reflected in the browser.
By using nodemon, any changes to the server will be made immediately present.

---

To run tests:

```
npm test
```

To build the production bundle:

```
npm run build
```

## Deployment

To deploy to Heroku

1.  Pull down the most recent version of master

```
git pull origin master
```

2.  Run:

```
heroku login
```

3.  Run:

```
heroku create
```

4.  In https://dashboard.heroku.com/apps, select your app, click on the "Settings" tab, and in the "config vars" section, input the env variables

5.  Also in https://dashboard.heroku.com/apps, click on the "Deploy" tab, and in the "Deployment Method" section, click on Github to link the repository to your Heroku app

6.  Click "open app" on the top right corner of your screen

7.  Pop those bottles!
