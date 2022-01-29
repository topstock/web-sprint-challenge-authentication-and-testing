# Authentication and Testing Sprint Challenge

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This challenge allows you to practice the concepts and techniques learned over the past sprint and apply them in a concrete project. This sprint explored **Authentication and Testing**. During this sprint, you studied **authentication, JSON web tokens, unit testing, and backend testing**. In your challenge this week, you will demonstrate your mastery of these skills by creating **a dad jokes app**.

This is an individual assessment. All work must be your own. All projects will be submitted to Codegrade for automated review. You will also be given feedback by code reviewers on Monday following the challenge submission. For more information on the review process [click here.](https://www.notion.so/bloomtech/How-to-View-Feedback-in-CodeGrade-c5147cee220c4044a25de28bcb6bb54a)

You are not allowed to collaborate during the sprint challenge.

## Project Setup

- [X] Run `npm install` to install your dependencies.
- [X] Build your database executing `npm run migrate`.
- [X] Run tests locally executing `npm test`.

## Project Instructions

Dad jokes are all the rage these days! In this challenge, you will build a real wise-guy application.

Users must be able to call the `[POST] /api/auth/register` endpoint to create a new account, and the `[POST] /api/auth/login` endpoint to get a token.

We also need to make sure nobody without the token can call `[GET] /api/jokes` and gain access to our dad jokes.

We will hash the user's password using `bcryptjs`, and use JSON Web Tokens and the `jsonwebtoken` library.

### MVP

Your finished project must include all of the following requirements (further instructions are found inside each file):

- [X] An authentication workflow with functionality for account creation and login, implemented inside `api/auth/auth-router.js`.
- [X] Middleware used to restrict access to resources from non-authenticated requests, implemented inside `api/middleware/restricted.js`.
- [X] A minimum of 2 tests per API endpoint, written inside `api/server.test.js`.

**IMPORTANT Notes:**

- Do not exceed 2^8 rounds of hashing with `bcryptjs`.
- If you use environment variables make sure to provide fallbacks in the code (e.g. `process.env.SECRET || "shh"`).
- You are welcome to create additional files but **do not move or rename existing files** or folders.
- Do not alter your `package.json` file except to install extra libraries. Do not update existing packages.
- The database already has the `users` table, but if you run into issues, the migration is available.
- In your solution, it is essential that you follow best practices and produce clean and professional results.
- Schedule time to review, refine, and assess your work and perform basic professional polishing.

## Submission format

- [X] Submit via Codegrade by pushing commits to your `main` branch on Github.
- [X] Check Codegrade before the deadline to compare its results against your local tests.
- [X] Check Codegrade on the days following the Sprint Challenge for reviewer feedback.
- [X] New commits will be evaluated by Codegrade if pushed _before_ the sprint challenge deadline.

## Interview Questions

Be prepared to demonstrate your understanding of this week's concepts by answering questions on the following topics.

1. Differences between using _sessions_ or _JSON Web Tokens_ for authentication.

Sessions utilize cookies which are stored in memory prefereably on a separate server, the memory cache server. The cache server maintains the session data and stores it with the session key. The api server keeps a key and uses it to pull session information from the cache.  The cache and server sessions expire at predetermined times often in 24 hours.  Each HTTP request between a an athenticated client and a server carries the cookie regardless of relevance. The server's cookie only holds the session id.  They are complex, but they help backup dataand you don't have to remember to delete them when designing an app.

However web tokens are timestamped name-id pairs prepended with a header identifying it's type and algorithm and appended with a signiture which includes an encryption of the former data and a secret specific to the api. The password is never shared and the secret cannot be decoded, however if a client shares the JWT, it would give access to the same data on the server that that client had.  JWT can be used selectively, but they take time to verify and may require an extra process to delete.


2. What does `bcryptjs` do to help us store passwords in a secure manner?

   bcryptjs hashes passwords for storage.  Thus leaks from the database will not contain actual passwords. 

3. How are unit tests different from integration and end-to-end testing?

    Answer: A unit test checks the output of a single function or similar code block.  In unit testing a low level function would be tested, then the next higher order function, one at a time to avoid generalizing the results among smaller units such as callback functions.  Each test is written in that confined scope and does not consider the value or effect on outside functions or output.  Many unit tests can be developed for one app such that a very detailed map of the app is reflected in the bulk of unit tests.

    In both integration testing and end to end testing larger scopes are considered.  Integration tests always consider the interactions between two objects or more modules, starting with two and adding one at a time until an accumulated body of tests reflects the quality of the data flow across the app.

    End to end testing includes all of the unit tests and integration tests of any possible use of the app by people or other apps or mechanisms.  The evidence of ease and flux of user-app interactions, networking, and data processing for better or worse, is disseminated in the most massive of end-to-end tests. It is a heuristic process that relies on the other two types of testing in the germination of truth. 



4. How does _Test Driven Development_ change the way we write applications and tests?

    Answer: Test Driven Development requires that we think of functionality before form. Write the tests, then onnly code the smallest module that passes the test. Thus every piece of code contributes to a passing test.  If the tests are written well, the code will be very efficient.  