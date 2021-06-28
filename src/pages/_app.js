import { ResinProvider } from '@/contexts/ResinContext'
import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return (
//     <div suppressHydrationWarning>
//       {typeof window === 'undefined' ? null : <Component {...pageProps} />}
//     </div>
//   )
// }

function MyApp({ Component, pageProps }) {
  return (
    <ResinProvider>
      <Component {...pageProps} />
    </ResinProvider>
  )
}

export default MyApp
