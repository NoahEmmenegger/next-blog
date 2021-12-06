import "../style/index.css";
import { ProvideAuth } from "../utils/auth";
import Layout from "../components/Layout";

import "../style/CommandList.css";

function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProvideAuth>
  );
}

export default MyApp;
