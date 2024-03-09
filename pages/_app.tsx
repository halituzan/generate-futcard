import AuthLayout from "@/app/Layouts/AuthLayout";
import Layout from "@/app/Layouts/Layout";
import store from "@/lib/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "@/Assets/css/globals.css";
import { Toaster } from "react-hot-toast";
export default function App({ Component, pageProps }: AppProps) {
  const isAuthPage = Component.displayName === "auth";

  if (isAuthPage) {
    return (
      <Provider store={store}>
        <AuthLayout>
          <Component {...pageProps} />
          <Toaster />
        </AuthLayout>
      </Provider>
    );
  } else {
    return (
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </Provider>
    );
  }
}
