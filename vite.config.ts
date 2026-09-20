import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

async function fetchOnlineWebImages(q: string) {
  try {
    const cleanQ = q.trim();
    const res1 = await fetch('https://duckduckgo.com/?q=' + encodeURIComponent(cleanQ + ' commercial print design mockup'), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const html = await res1.text();
    const vqdMatch = html.match(/vqd=["']?([\d-]+)["']?/);
    if (!vqdMatch) return [];
    const vqd = vqdMatch[1];
    const res2 = await fetch(`https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(cleanQ + ' commercial print design mockup')}&vqd=${vqd}&f=,,,`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://duckduckgo.com/'
      }
    });
    if (!res2.ok) return [];
    const json = await res2.json();
    return (json.results || []).slice(0, 24).map((r: any, idx: number) => ({
      id: `web-${idx}-${Date.now()}`,
      title: r.title || cleanQ,
      url: r.image,
      thumbnail: r.thumbnail || r.image,
      source: 'Google / Live Web',
      domain: r.source || 'Web Search'
    }));
  } catch (err) {
    console.error('Failed to fetch online web images:', err);
    return [];
  }
}

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'web-image-search-api',
        configureServer(server) {
          server.middlewares.use('/api/search-images', async (req, res) => {
            try {
              const url = new URL(req.url || '', 'http://localhost:3000');
              const query = url.searchParams.get('q') || '';
              if (!query) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ results: [] }));
                return;
              }
              const results = await fetchOnlineWebImages(query);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ results }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message, results: [] }));
            }
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
