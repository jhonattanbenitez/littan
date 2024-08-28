"use client";

import Navigation from "./components/Navigation/Navigation";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AuthWrapper from "./AuthWrapper";

export default function ClientLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthWrapper>
        <Navigation />
        <main>{children}</main>
      </AuthWrapper>
    </Provider>
  );
}
