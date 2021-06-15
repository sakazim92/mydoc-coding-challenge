# The Shortest URL

This project implements the shortest url service using node with express.

### Brief

ShortLink is a URL shortening service where you enter a URL such as https://codesubmit.io/library/react and it returns a short URL such as http://short.est/GeAi9K.

### Installation

1. Clone the repo. Use SSH, it's better.
2. Obtain a copy of the latest `.env.local` from an administrator.
3. If needed, install `node` version `14.x`. I'd recommend using [nvm](https://github.com/nvm-sh/nvm).
5. Install dependencies:
```
npm install
```
6. Start the server:
```
npm run start
```
### Usage

1. Import the postman collection see [postmanCollection.json](postmanCollection.json)
2. Run the encode route with payload already added
3. Copy shortUrl received from the above api call and hit it in the browser to see short url redirection
4. Go to decode api and paste the shortUrl link copied above in the request payload value
5. Run the decode api and the result should contain the actual url in response

### Testing

Run `npm run test` to test the endpoints locally.

### File and Folder naming conventions

1. All files should be single word, multiple words should be separated by a dot. E.g. `src/utils/url.utility.js`.
2. Objects and variables in files and/or APIs should use camel case for everything.
3. All routes are located in `src/routes`.
4. All tests are located in `src/tests`
5. constants should be declard in snake case E.g. ` URL_DATA`
