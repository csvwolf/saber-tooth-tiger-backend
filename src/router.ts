/// <reference path="../typings/index.d.ts" />
import * as koaRouter from 'koa-router';
import * as fs from 'fs';


function addMapping(router, mapping: Object) {
  for (let url in mapping) {
    if (url.startsWith('GET ')) {
      let path = url.substring(4);
      router.get(path, mapping[url]);
    } else if (url.startsWith('POST ')) {
      const path = url.substring(5);
      router.post(path, mapping[url]);
    } else {
      console.log(`invaild router`);
    }
  }
}

function addControllers(router, dir: string) {
  const files = fs.readdirSync(dir);
  const js_files = files.filter(f => f.endsWith('.js'), files);

  for (let f of js_files) {
    let mapping = require(`${__dirname}/controllers/${f}`);
    addMapping(router, mapping);

  }
}

export default function (dir?) {
  let controllers_dir = dir || __dirname + '/controllers';
  const router = new koaRouter();

  addControllers(router, controllers_dir);

  return router.routes();
}
