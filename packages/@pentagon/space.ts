export default function deleteSpaces(string: string): string {
  return string.replace(/(\r\n|\n|\r)/gm, '');
}
