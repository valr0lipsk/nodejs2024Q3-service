# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/valr0lipsk/nodejs2024Q3-service.git
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

## DOCKER RUN!!

- ensure that migrations folder is exist
- ensure that .env file is exist and filled with correct data (see .env.example, copy .env.example to .env)
- ensure that your node version is 22.x
- on the first run, run following command in the root folder:

```
docker-compose up --build
```

- on the second run, run in the root folder:

```
docker-compose up
```

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
