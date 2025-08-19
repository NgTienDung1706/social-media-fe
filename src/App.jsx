import AppRouter from "./AppRouter";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";

//import { AuthProvider } from "@/contexts/AuthContext";
import { ConfirmModalProvider } from "@/contexts/ConfirmModalContext";



function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <ConfirmModalProvider>
            <AppRouter />
          </ConfirmModalProvider>
      </PersistGate>
    </Provider>
  )
}

export default App;
