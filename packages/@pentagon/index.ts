import hash from 'hash-sum';
import * as _ from 'lodash';
import { config } from './interface/config';
import createViteServer from './plugins/vite-server';
import { EXCLUDE } from './constants/exclude';
import pentagonBuild from './plugins/pentagon-build/build';

export default class PentagonCore {
  private output: boolean;
  private construction: string[];

  public base: string;
  public config: config = {
    global: {
      name: 'pentagon-app',
      description: 'Simple Document Using Pentagon',
      homepage: '<YOUR-HOMEPAGE-HERE>',
      features: [],
      madeBy: 'team',
    },
    content: {
      startMessage: 'Are you ready?',
      startBtn: { message: 'tutorial', href: '/c' },
    },
    naviBar: [],
    posts: [],
  };

  /**
   * Create App
   * ```js
   * new PentagonCore(["README.md", "hi.md"], __dirname, true, {})
   * ```
   * @param construction markdown files `*.md` or `*`
   * @param base base directory
   * @param output logging
   * @param config config
   */
  constructor(construction: string[], base: string, output: boolean = true, config: object) {
    this.output = output;
    this.base = base;
    this.construction = construction;
    this.config = _.defaults(config, this.config);
  }

  /**
   * Create Dev Server
   */
  public dev() {
    console.log('');

    this.log(`building..`, true);

    this.build();

    this.log(`starting server..\n`, true);

    this.server();
  }
  /**
   * Build App
   */
  public build(): void {
    pentagonBuild(this.construction, this.err, this.correctFileName, this.base, this.createHash, this.config);
  }

  public async server(port: number = 3000) {
    await createViteServer(port);
  }

  // Private

  private err(message: string, prefix: boolean = false): void {
    console.log(`${prefix ? '(!) [pentagon]' : ''} ${message}`.red);
  }

  private log(message: string, prefix: boolean = false): void {
    if (this.output) console.log(`${prefix ? '[pentagon]' : ''} ${message}`);
  }

  private createHash() {
    return hash(Date.now());
  }

  private correctFileName(postName: string) {
    return !EXCLUDE.includes(postName.split('\\')[postName.split('\\').length - 1]);
  }
}
