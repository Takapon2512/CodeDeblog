import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { StyledEngineProvider } from '@mui/material/styles'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <StyledEngineProvider injectFirst>
        <Component {...pageProps} />
      </StyledEngineProvider>
    </RecoilRoot>
  )
}
