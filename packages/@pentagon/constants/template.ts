export const TEMPLATE = {
  MAIN: `import App from './pages/App.svelte';const app = new App({target: document.getElementById('app')});export default app;`,
  HEAD: `export default function head() {let a = document.querySelectorAll(".container h2");let r = [];a.forEach((e)=>{r.push(e.innerHTML)});return r;}`,
};
