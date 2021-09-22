import { createServer, ViteDevServer } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/

export default async function createViteServer(port: number = 3000): Promise<ViteDevServer> {
  const server = await createServer({
    configFile: false,
    root: `${process.cwd()}\\.pentagon`,
    plugins: [svelte()],
    server: { fs: { strict: false } },
  });

  await server.listen(port);

  return server;
}
