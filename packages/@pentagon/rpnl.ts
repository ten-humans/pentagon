import replaceAll from './replace';

export default function rpln(str: string, replaceStr: string): string {
  return replaceAll(str, /(\r\n|\n|\r)/gm, replaceStr);
}
