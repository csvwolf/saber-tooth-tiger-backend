/// <reference path="../typings/index.d.ts" />
import * as koa from 'koa';

const app = new koa();

app.use(function *() {
  this.body = 'Hello World';
});

app.listen(3001);