import { Provider } from "react-redux";

import store from "@/redux/store/store";
import RootStackNavigator from "@/navigations/root-stack";

export default function App() {
  return (
    <Provider store={store}>
      <RootStackNavigator />
    </Provider>
  );
}
