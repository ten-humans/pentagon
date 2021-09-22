import { readFileSync } from 'fs';
import { join } from 'path';
import { compileAsset } from '../../compileAsset';
import replaceAll from '../../replace';
import rpln from '../../rpnl';

export default function createSveltePost(content: { html: string; meta: any }, e: string): string {
  return compileAsset(
    readFileSync(join(__dirname, '../../../../assets/svelte/post.svelte')).toString(),
    'pentagon-',
    { before: 'post-content', after: replaceAll(replaceAll(rpln(content.html, ''), '`', '\\`'), '${', '\\$\\{') },
    { before: 'post-hash', after: e }
  );
}
