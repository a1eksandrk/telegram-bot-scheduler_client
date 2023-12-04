import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import path from 'node:path'

export default defineConfig({
  plugins: [solid({ typescript: { onlyRemoveTypeImports: true } })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})
