import { defineConfig } from 'astro/config';
import auto from '@astrojs/adapter-auto';

export default defineConfig({
  adapter: auto(),
});
