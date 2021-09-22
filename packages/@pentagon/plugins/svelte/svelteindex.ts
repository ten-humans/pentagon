import { readFileSync } from 'fs';
import { join } from 'path';
import { compileAsset } from '../../compileAsset';
import { config } from '../../interface/config';

export default function createIndexPage(config: config): string {
  const f = config.global.features.map(
    (e) => `
  <div class="card-feature">
    <div class="card-content">
      <div class="card-title">${e.title}</div>
      <div class="card-des">${e.content}</div>
    </div>
  </div>`
  );
  const n = config.naviBar.map(
    (e) => `
  <li><a href="${e.href}" class="top-li">${e.message}</a></li>`
  );
  return compileAsset(
    readFileSync(join(__dirname, '../../../../assets/svelte/index.svelte')).toString(),
    'pentagon-',
    { before: 'global-name', after: config.global.name },
    { before: 'global-homepage', after: config.global.homepage },
    { before: 'global-description', after: config.global.description },
    { before: 'global-by', after: config.global.madeBy },
    { before: 'content-cards', after: f.join('\n') },
    { before: 'content-start-message', after: config.content.startMessage },
    { before: 'content-start-btn-h', after: config.content.startBtn.href },
    { before: 'content-start-btn-m', after: config.content.startBtn.message },
    { before: 'nav-bar', after: n.join('\n') }
  );
}
