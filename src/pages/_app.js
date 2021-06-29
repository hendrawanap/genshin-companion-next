import { ResinProvider } from '@/contexts/ResinContext'
import { UserProvider } from '@/contexts/UserContext'
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
    <UserProvider>
      <ResinProvider>
        <Component {...pageProps} />
      </ResinProvider>
    </UserProvider>
  )
}

export default MyApp
