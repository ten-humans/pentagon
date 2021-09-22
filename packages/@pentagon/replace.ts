export default function replaceAll(str: string, searchStr: string | RegExp, replaceStr: string): string {
  return str.split(searchStr).join(replaceStr);
}
