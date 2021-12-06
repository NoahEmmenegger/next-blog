import '../style/index.css'
import {ProvideAuth} from '../utils/auth'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'

import '../style/CommandList.css'


function MyApp({ Component, pageProps }) {
  const router = useRouter()

  if(router.pathname === '/page/[slug]') {
    return (
      <div>
         <Component {...pageProps} />
      </div>
    )
  }

  if(router.pathname.startsWith('/dashboard')) {
    return (
      <ProvideAuth>
         <Component {...pageProps} />
      </ProvideAuth>
    )
  }

  return (
    <ProvideAuth>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProvideAuth>
  )
}

export default MyApp
