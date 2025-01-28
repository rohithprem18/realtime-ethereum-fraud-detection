/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_INFURA_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 