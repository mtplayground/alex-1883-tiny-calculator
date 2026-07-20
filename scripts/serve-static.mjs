/* global console, process, URL */

import { createServer } from 'node:http';
import { createReadStream, promises as fs } from 'node:fs';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootArg = process.argv[2] ?? 'dist';
const root = resolve(process.cwd(), rootArg);
const port = Number(process.env.PORT ?? 4173);
const host = process.env.HOST ?? '127.0.0.1';

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
]);

await fs.access(root);

const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end();
    return;
  }

  try {
    const filePath = await resolveRequestPath(request.url ?? '/');
    const contentType = contentTypes.get(extname(filePath)) ?? 'application/octet-stream';
    response.writeHead(200, {
      'Cache-Control': 'no-store',
      'Content-Type': contentType,
    });

    if (request.method === 'HEAD') {
      response.end();
      return;
    }

    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
});

server.listen(port, host, () => {
  const scriptPath = fileURLToPath(import.meta.url);
  console.log(`Serving ${root} from ${scriptPath}`);
  console.log(`Local: http://${host}:${port}/`);
});

async function resolveRequestPath(requestUrl) {
  const { pathname } = new URL(requestUrl, `http://${host}:${port}`);
  const decodedPath = decodeURIComponent(pathname);
  const candidate = resolve(root, `.${decodedPath}`);

  if (candidate !== root && !candidate.startsWith(`${root}${sep}`)) {
    throw new Error('Path escapes static root');
  }

  const stats = await fs.stat(candidate);
  const filePath = stats.isDirectory() ? join(candidate, 'index.html') : candidate;
  await fs.access(filePath);
  return filePath;
}
