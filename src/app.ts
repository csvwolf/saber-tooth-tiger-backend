/// <reference path="../typings/index.d.ts" />
import * as koa from 'koa';
// import * as bodyParser from 'koa-bodyparser';
import controller from './router';

const app = new koa();

// app.use(bodyParser());
app.use(controller());
app.use(function *() {
  this.body = 'Hello World';
});

app.listen(3001);
