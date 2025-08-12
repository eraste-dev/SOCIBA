import React, {Suspense} from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { persistor, store } from "./app/reducer/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// STYLE
import "./styles/index.scss";
import "./index.css";
import "./fonts/line-awesome-1.3.0/css/line-awesome.css";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";
//
const RtlImportCssLazy = React.lazy(() => import("RtlImportCss"));
//

document
    .getElementsByTagName("html")[0]
    .setAttribute("dir", import.meta.env.VITE_LRT_OR_RTL);

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DevSupport ComponentPreviews={ComponentPreviews}
                    useInitialHook={useInitial}
        >
          <App/>
        </DevSupport>

        {/* LOAD RTL CSS WHEN RTL MODE ENABLE */}
        {import.meta.env.VITE_LRT_OR_RTL === "rtl" && (
          <Suspense fallback={<div/>}>
            <RtlImportCssLazy/>
          </Suspense>
        )}
      </PersistGate>
    </Provider>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
