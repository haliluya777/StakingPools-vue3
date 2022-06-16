// src/types/env.d.ts
interface ImportMetaEnv {
    readonly  VITE_MODE_NAME:string,
    readonly  VITE_NETWORK:string,
    readonly VITE_BASE_API:string,
}

interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}