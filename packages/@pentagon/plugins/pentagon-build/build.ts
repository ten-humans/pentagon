import { TEMPLATE } from '../../constants/template';
import createSveltePost from '../svelte/sveltepost';
import createIndexPage from '../svelte/svelteindex';
import deleteSpaces from '../../space';
import replaceAll from '../../replace';
import { join } from 'path';
import markdown from '../pentagon-markdown/markdown';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import { config } from '../../interface/config';

export default function pentagonBuild(construction: string[], err, correctFileName, base, createHash, config: config) {
  let chunks: object = {};

  // Rebuild

  if (fs.existsSync(join(process.cwd(), '.pentagon')))
    fs.rmdirSync(join(process.cwd(), '.pentagon'), { recursive: true });
  fs.mkdirSync(join(process.cwd(), '.pentagon'));

  fse.copySync(join(process.cwd(), 'src/public'), join(process.cwd(), '.pentagon'));

  fs.writeFileSync(
    join(process.cwd(), '.pentagon/default.css'),
    deleteSpaces(fs.readFileSync(join(__dirname, '../../../../assets/style/default.css')).toString())
  );

  construction.forEach((element) => {
    if (!correctFileName(element)) err(`${element.bold} is not correct file name.`, true);
    else {
      const chunk = createHash();
      const data = fs.readFileSync(`${base}\\src\\pages\\${element}`).toString();
      const md = markdown(data);
      fse.outputFileSync(
        `${base}\\.pentagon\\dist\\assets\\${chunk}.svelte`,
        createSveltePost({ html: md, meta: '' }, chunk)
      );
      chunks[element] = chunk;
    }
  });

  let AppScript: string = 'import {Router, Route} from "svelte-routing";export let url="";';
  let AppBody: string = '';

  Object.keys(chunks).forEach((e) => {
    AppScript = AppScript + `import P${chunks[e]} from "../assets/${chunks[e]}.svelte";`;
  });

  Object.keys(chunks).forEach((e) => {
    let dn = replaceAll(e.substr(1).replace('.md', ''), '\\', '/');
    let re = dn.split('/');
    if (re[re.length - 1].toUpperCase() === 'README') {
      dn = re.slice(0, re.length - 1).join('/');
    }
    AppBody = AppBody + `<Route path="/docs/${dn}"><P${chunks[e]} /></Route>`;
  });

  AppBody =
    AppBody + `<Route>${fs.readFileSync(join(__dirname, '../../../../assets/svelte/404.svelte')).toString()}</Route>`;

  fse.outputFileSync(`${base}\\.pentagon\\dist\\data\\chunks.json`, deleteSpaces(JSON.stringify(chunks)));
  fse.outputFileSync(
    `${base}\\.pentagon\\dist\\pages\\App.svelte`,
    deleteSpaces(
      `<script>${AppScript}</script><Router url="{url}"><Route path="/">${createIndexPage(
        config
      )}</Route>${AppBody}</Router>`
    )
  );

  fse.outputFileSync(`${base}\\.pentagon\\dist\\main.js`, deleteSpaces(TEMPLATE.MAIN));
}
