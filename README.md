# Rio
Automatic Express API README generator

[![Actions Status](https://github.com/RyuGames/Rio/workflows/Tests/badge.svg)](https://github.com/RyuGames/Rio/actions)
[![Actions Status](https://github.com/RyuGames/Rio/workflows/Linter/badge.svg)](https://github.com/RyuGames/Rio/actions)
[![codecov](https://codecov.io/gh/RyuGames/Rio/branch/main/graph/badge.svg?token=V2HH92MN1A)](https://codecov.io/gh/RyuGames/Rio)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

## Installation Guide
Install CLI with:
```bash
npm i -g ./
```

## Converting Express endpoint to Rio endpoint:
Here is an example Express API endpoint that takes no arguments and returns the string `"Hello, world"`:

```javascript
app.get('/', (req, res) => {
  res.status(200).send('Hello, world');
});
```

The corresponding Rio endpoint looks like this:
```javascript
rio.get('/', (req, res) => {
  res.status(200).send('Hello, world');
}, [], 'Hello, world endpoint. No functionality');
```

The key differences are:
- Changing `app` to `rio`
- Adding an empty array for the expected arguments, after the callback
- Adding an optional description string, after the arguments array

## More complicated usage
Here is an implementation of an API used to sum two integer values:

```javascript
const { ArgumentType } = rio;
const { Integer } = ArgumentType;

const A = new rio.Argument('a', Integer, true, 'A number to be added');
const B = new rio.Argument('b', Integer, true, 'Another number to be added');

rio.get(app, '/sum', (req, res) => {
  let { a, b } = req.query;
  a = parseInt(a, 10);
  b = parseInt(b, 10);
  const result = JSON.stringify({ result: a + b });
  res.status(200).send(result);
}, [A, B], 'Adds two numbers together');
```

Initialize arguments with:
- The expected name of the variable
- The type
- Whether they are required
- An optional description

They are then passed into the `rio.get` or `rio.post` functions. If the request to the endpoint is missing either an integer value for `a` or `b`, then the endpoint will automatically return an error 403, without calling the callback.

### Argument Types
Rio currently supports the following types:
- String
- Integer
- Float
- Boolean
- Array
- Map

## Using the CLI to generate a README
Use the CLI command to generate API docs with:
```bash
rio init <path-to-api.js>
```
Omitting the path will default it to `./api.js`

## Example API Docs
You can view an example README [here](API-README.md) and the corresponding server code is available [here](api.js). Also can be found here:
