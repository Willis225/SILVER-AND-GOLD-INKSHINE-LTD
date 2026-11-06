import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// 1. Strictly disable X-Powered-By header (suppresses "X-Powered-By: Express")
app.disable('x-powered-by');

// 2. Global Security Header Middleware: Strip X-Powered-By and hide Server software and version
app.use((_req, res, next) => {
  res.removeHeader('X-Powered-By');
  res.removeHeader('x-powered-by');
  res.removeHeader('Server');
  res.removeHeader('server');

  const origSetHeader = res.setHeader.bind(res);
  res.setHeader = (name: string, value: any) => {
    const lower = name.toLowerCase();
    if (lower === 'x-powered-by' || lower === 'server') {
      return res;
    }
    return origSetHeader(name, value);
  };

  next();
});

// 3. Serve static files from dist directory in production
app.use(express.static(path.join(__dirname, 'dist')));

// 4. Fallback to index.html for React SPA client-side routing
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Production web server running securely on port ${port} (X-Powered-By and Server version hidden).`);
});
