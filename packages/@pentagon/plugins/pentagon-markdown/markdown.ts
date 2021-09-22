import marked from 'marked';
import hljs from 'highlight.js';
import replaceAll from '../../replace';

const renderer = new marked.Renderer();

renderer.heading = function (text, level, id) {
  const v = replaceAll(id.toString().toLowerCase(), ' ', '-');
  const r = `<h${level} id="${v}">${text} <a href="#${v}" style="display: inline;" class="h-sharp">#</a></h${level}>\n`;

  return r;
};

marked.setOptions({
  langPrefix: 'hljs language-',
  renderer: renderer,
  xhtml: true,
  highlight: function (code) {
    return hljs.highlightAuto(code, [
      'html',
      'css',
      'python',
      'bash',
      'c',
      'json',
      'markdown',
      'jsx',
      'tsx',
      'js',
      'ts',
      'md',
      'svelte',
      'scss',
      'vue',
    ]).value;
  },
});

export default function markdown(content: string): string {
  return marked(content);
}
