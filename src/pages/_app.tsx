import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

import { api } from "@/utils/api";

import "@/styles/globals.scss";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Component {...pageProps} />
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
