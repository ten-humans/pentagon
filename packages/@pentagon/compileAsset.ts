import { compileParams } from './interface/compileAsset';
import replaceAll from './replace';

export function compileAsset(source: string, prefix: string, ...data: compileParams[]): string {
  data.forEach((e) => {
    source = replaceAll(source, `%${prefix}${e.before}%`, e.after);
  });
  return source;
}
