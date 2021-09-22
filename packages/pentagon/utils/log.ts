export default function log(message: string, prefix: string = 'pentagon'): void {
  console.log(`${`[${prefix}]`.blue} ${message}`);
}
