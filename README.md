# Usage

Dummy trip data: `./assets/json/tripData.json`

### Copy and run:

```
npm install && sudo npx playwright install-deps && node index.js
```

- Agoda: [http://localhost:5253/agoda](http://localhost:9001/agoda)

###### Fast AND accurate 😉

##### Possible scraping tools

- Puppeteer
- (The one used) Playwright (tends to be faster on real-world scenarios)

More info: [https://blog.checklyhq.com/puppeteer-vs-selenium-vs-playwright-speed-comparison/](https://blog.checklyhq.com/puppeteer-vs-selenium-vs-playwright-speed-comparison/)

##### Issue - if hotel is not registered on Agoda.com, might return results of a hotel with a similar name in the surrounding area
