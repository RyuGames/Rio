const express = require('express');
const http = require('http');
const rio = require('./src/index');

const app = express();
const server = http.createServer(app);

const { rInt } = rio;

const globalArgs = [rInt('version', 'A version number')];

rio.init(app, 'RIO Example API', globalArgs);

const limit = '300KB';
app.use(express.json({ limit }));
app.use(express.urlencoded({ limit, extended: true, parameterLimit: 50000 }));

const router = express.Router();

const routerName = '/v2';
rio.router.init(router, routerName);

rio.router.get(
  routerName,
  '/sum',
  (req, res) => {
    let { a, b } = req.query;
    a = rio.formatter.Int(a);
    b = rio.formatter.Int(b);
    res.status(200).send(JSON.stringify({ result: a + b }));
  },
  [rio.rInt('a', 'a number', 3), rio.rInt('b', 'a number', 4)],
  'Adds numbers',
  { result: [7], other: { A: 'A' }, b: [] },
);

rio.router.post(
  routerName,
  '/sum',
  (req, res) => {
    let { a, b } = req.body;
    a = rio.formatter.Int(a);
    b = rio.formatter.Int(b);
    res.status(200).send(JSON.stringify({ result: a + b }));
  },
  [rio.rInt('a', 'a number', 10), rio.rInt('b', 'a number', 25)],
  'Adds numbers',
  [35],
);

rio.router.put(
  routerName,
  '/data',
  (req, res) => {
    let { a, b } = req.body;
    a = rio.formatter.Int(a);
    b = rio.formatter.Int(b);
    res.status(200).send(JSON.stringify({ result: { a, b } }));
  },
  [rio.rInt('a', 'a number', 10), rio.rInt('b', 'a number', 25)],
  'stores numbers',
  [{ a: 10, b: 25 }],
);

rio.router.patch(
  routerName,
  '/data',
  (req, res) => {
    let { a, b } = req.body;
    a = rio.formatter.Int(a);
    b = rio.formatter.Int(b);
    res.status(200).send(JSON.stringify({ result: { a, b } }));
  },
  [rio.oInt('a', 'a number', 10), rio.oInt('b', 'a number', 25)],
  'updates stored numbers',
  [{ a: 10, b: 25 }],
);

rio.router.delete(
  routerName,
  '/data',
  (req, res) => {
    res.status(200).send(JSON.stringify({ result: true }));
  },
  [],
  'updates stored numbers',
  [true],
);

app.use(routerName, router);

rio.get(
  '/greetings',
  (req, res) => {
    res.status(200).send('Hello, world!');
  },
  [],
  'Returns Hello, world!',
  'Hello, world!',
);

rio.get(
  '/greetings/say/hi',
  (req, res) => {
    res.status(200).send('Hi!');
  },
  [],
  'Returns Hi!',
  'Hi!',
);

rio.get(
  '/greetings/say/:greeting',
  (req, res) => {
    const { greeting } = req.params;
    res.status(200).send(greeting);
  },
  [],
  'Returns the greeting!',
  'Hi!',
);

rio.get(
  '/greetings/say/greet/:greeting/hi',
  (req, res) => {
    const { greeting } = req.params;
    res.status(200).send(`${greeting}, hi!`);
  },
  [],
  'Returns the greeting!',
  'Hi!',
);

rio.get(
  '/greetings/say/greet/:greeting/yo',
  (req, res) => {
    const { greeting } = req.params;
    res.status(200).send(`${greeting}, yo!`);
  },
  [],
  'Returns the greeting!',
  'Hi!',
);

rio.get(
  '/greetings/get',
  (req, res) => {
    res.status(200).send('Hi!');
  },
  [],
  'Returns Hi!',
  [],
);

rio.get(
  '/',
  (req, res) => {
    const result = JSON.stringify({ result: 'Hello, world' });
    res.status(200).send(result);
  },
  [],
  "Returns the string 'Hello, world'",
  77,
);

rio.post(
  '/',
  (req, res) => {
    const result = JSON.stringify({ result: 'Hello, world' });
    res.status(200).send(result);
  },
  [],
  "Returns the string 'Hello, world'",
  { result: 'Hello, world' },
);

rio.get(
  '/math/sum',
  (req, res) => {
    let { a, b } = req.query;
    a = parseInt(a, 10);
    b = parseInt(b, 10);
    const result = JSON.stringify({ result: a + b });
    res.status(200).send(result);
  },
  [rInt('a', 'A number to be added'), rInt('b', 'Another number to be added')],
  'Adds two numbers together',
  { result: 2 },
);

rio.post(
  '/math/makeSum',
  (req, res) => {
    let { a, b } = req.body;
    a = parseInt(a, 10);
    b = parseInt(b, 10);
    const result = JSON.stringify({ result: a + b });
    res.status(200).send(result);
  },
  [rInt('a', 'A number to be added'), rInt('b', 'Another number to be added')],
  'Adds two numbers together',
  { result: 2 },
  rio.preview,
  rio.private,
);

if (rio.cli !== true) {
  const port = 3000;
  server.listen(port, () => {
    /* istanbul ignore next */
    console.log(`Serving on port ${port}`);
  });
}

module.exports = {
  app,
  server,
};
