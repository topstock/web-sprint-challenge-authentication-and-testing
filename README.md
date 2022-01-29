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

sessions utilize cookies which are stored on clients.  Servers maintain a store of session data.  The store expires the sessions at predetermined times usually in 24 hours.  Each HTTP request from an athenticated client to that server carries the cookie regardless of relevance.

However web tokens are timestamped client data prepended with a header and appended with a signiture which includes a secret specific to the api, all of which is given a salt.that cannot be decrypted without a secret that is not shared off of the  hashes a header containing the algorithm and a key indicating that that the hash encrypted sequence is a web token.  It appends that to a hashed passwords by adding a secret 


Cookies and web tokens can be deleted from the client.

2. What does `bcryptjs` do to help us store passwords in a secure manner?

   bcrypt hashes a header containing the algorithm and a key indicating that that the hash encrypted sequence is a web token.  It appends that to a hashed passwords by adding a secret, a timestamp, and  

3. How are unit tests different from integration and end-to-end testing?

    Answer: A unit test checks the output of a single function or similar code block.  In unit testing a low level function would be tested, then the next higher order function, one at a time to avoid generalizing the results among smaller units such as callback functions.  Each test is written in that confined scope and does not consider the value or effect on outside functions or output.  Many unit tests can be developed for one app such that a very detailed map of the app is reflected in the bulk of unit tests.

    In both integration testing and end to end testing larger scopes are considered.  Integration tests always consider the interactions between two objects or more modules, starting with two and adding one at a time until an accumulated body of tests reflects the quality of the data flow across the app.

    End to end testing includes all of the unit tests and integration tests of any possible use of the app by people or other apps or mechanisms.  The evidence of ease and flux of user-app interactions, networking, and data processing for better or worse, is disseminated in the most massive of end-to-end tests. It is a heuristic process that relies on the other two types of testing in the germination of truth. 



4. How does _Test Driven Development_ change the way we write applications and tests?
