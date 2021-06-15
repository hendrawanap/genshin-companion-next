import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return (
//     <div suppressHydrationWarning>
//       {typeof window === 'undefined' ? null : <Component {...pageProps} />}
//     </div>
//   )
// }

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
