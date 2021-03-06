# ClimatePartner Coding Challenge

## Tech stack

- Server
  - [NodeJS](https://nodejs.org/en/docs/)
  - [Typescript](https://www.typescriptlang.org/docs/)
  - [Fastify](https://www.fastify.io/docs/latest/)
  - [NEDB-Promises](https://github.com/bajankristof/nedb-promises)
- Client
  - [Typescript](https://www.typescriptlang.org/docs/)
  - [React](https://reactjs.org/docs/getting-started.html)
  - [Material-UI](https://material-ui.com/getting-started/installation/)

&nbsp;

## Introduction/Expectations

There are two data models to be aware of, Projects and Orders. A project includes, among other details, an "Available offset amount" which is a representation of the total available CO2 offset measured in kilograms. An order can be placed against any given project for a specified amount of CO2 offset in kilograms. When an order is created, the offset amount of the order should be subtracted from the available offset amount of the target project.

Throughout the project, you will see `TODO` comments indicating outstanding tasks. The order in which the tasks are completed is up to you to decide, how you approach the tasks is part of how we will get to understand the way in which you work. It is _NOT_ expected that you will complete all of the available tasks. While knowledge of modern frameworks will be useful, it is not required in order to complete the tasks. Where some knowledge of framework specifics would be good to know, you will find already working examples that should help in completing the tasks.

Important files to take note of are:

- server/index.ts
- src/api.ts
- src/App.tsx
- src/OrderForm.tsx
- common/types.ts

## Running tests
If you intend to write tests, the test files should be created in a `__tests__` sub folder of `src` and `server` respectfully.
In order to run the tests please execute:
```bash
yarn client:test
```
or 
```bash
yarn server:test
```
