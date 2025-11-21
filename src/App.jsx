import AppRouter from "./AppRouter";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";
import SocketProvider from "@/contexts/SocketProvider"; // Import mới

//import { AuthProvider } from "@/contexts/AuthContext";
import { ConfirmModalProvider } from "@/contexts/ConfirmModalContext";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SocketProvider>
          <ConfirmModalProvider>
            <AppRouter />
          </ConfirmModalProvider>
        </SocketProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
