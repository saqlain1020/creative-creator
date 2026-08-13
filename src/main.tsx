import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = createRoot(document.getElementById('root')!)

async function boot() {
  if (
    import.meta.env.DEV &&
    new URLSearchParams(window.location.search).has('capture')
  ) {
    const [{ CapturePreviews }] = await Promise.all([
      import('./CapturePreviews.tsx'),
      import('./CapturePreviews.css'),
    ])
    root.render(<CapturePreviews />)
    return
  }

  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

void boot()
