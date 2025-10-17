// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['@/assets/css/main.css'],
  ssr: true,
  nitro: {
    preset: 'vercel',
  },
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      titleTemplate: '%s - Orange Store',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Orange Store - Shop the latest products and trends.' },
        { name: 'theme-color', content: '#FF7A00' },
        { name: 'og:type', content: 'website' },
        { name: 'og:title', content: 'Orange Store' },
        { name: 'og:description', content: 'Shop high-quality products at Orange Store.' },
        { name: 'og:image', content: '/images/og-image.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  },
  vite: {
    plugins: [tsconfigPaths()],
    resolve: {
      alias: {
        '@': new URL('./', import.meta.url).pathname,
      },
    },
  },
  runtimeConfig: {
    apiSecret: '',
    public: {
      API_BASE: process.env.NUXT_PUBLIC_API_BASE ?? 'https://fakestoreapi.com',
    },
  },
  devtools: { enabled: true },
})
