import '../styles/globals.css'
import '../styles/app.css'

function MyApp({ Component, pageProps }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : <Component {...pageProps} />}
    </div>
  )
}

export default MyApp
