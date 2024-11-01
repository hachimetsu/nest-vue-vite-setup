import { Injectable } from '@nestjs/common';
import { createServer as createViteServer, ViteDevServer } from 'vite';
import expressStaticGzip from 'express-static-gzip';
import path from 'path';
import * as express from 'express';

@Injectable()
export class AppService {
  private vite: ViteDevServer;

  getHello(): string {
    return 'Hello World!';
  }

  async initialize(app: express.Express) {
    console.log('Initializing Vite', process.env.NODE_ENV);

    if (process.env.NODE_ENV === 'production') {
      const distPath = path.resolve(__dirname, '../dist');
      app.use(expressStaticGzip(distPath, { index: false }));
      
      // Serve index.html for any non-API request
      app.get('*', (req, res) => {
        if (!req.path.startsWith('/api')) {
          res.sendFile(path.join(distPath, 'index.html'));
        } else {
          res.status(404).send('Not Found');
        }
      });
    } else {
      this.vite = await createViteServer({
        server: { middlewareMode: true },
      });

      // Use Vite middleware for non-API requests
      app.use((req, res, next) => {
        if (!req.path.startsWith('/api')) {
          this.vite.middlewares(req, res, next);
        } else {
          next();
        }
      });
    }
  }
}

