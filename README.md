## Steps to get checked:

- Clone repo and checkout to the **part1** branch
- Install dependencies: **npm i**
- Create .env file (based on .env.example): ./.env - (if you need, default port 4000)
- Start server: **npm run start**  
- For run linter: **npm run lint**
- For run tests: **npm run test**
- For view OpenAPI documentation: open in your browser http://localhost:4000/doc/ 

 **Attention! Before run tests, start the server in another terminal window**

## Basic Scope

- [x] **+10** The repository with the application contains a `Readme.md` file containing detailed instructions for installing, running and using the application
- [x]  **+10** The application code that worked with `Users` instance divided into modules according to to its purpose and Nest.js architecture conventions (work with request and response in controller, business logic in service, etc.)
- [x]  **+10** The application code that worked with `Tracks` instance divided into modules according to to its purpose and Nest.js architecture conventions (work with request and response in controller, business logic in service, etc.)
- [x]  **+10** The application code that worked with `Albums` instance divided into modules according to to its purpose and Nest.js architecture conventions (work with request and response in controller, business logic in service, etc.)
- [x]  **+10** The application code that worked with `Artists` instance divided into modules according to to its purpose and Nest.js architecture conventions (work with request and response in controller, business logic in service, etc.)
- [x]  **+10** The application code that worked with `Favorites` instance divided into modules according to to its purpose and Nest.js architecture conventions (work with request and response in controller, business logic in service, etc.)
- [x]  **+10** For each successfully passed test

## Advanced Scope
- [x]  **+10** PORT value is stored into `.env` file
- [x]  **+20** OpenAPI spec in `doc` folder corresponds with assignment


# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
