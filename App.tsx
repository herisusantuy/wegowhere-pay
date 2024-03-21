import RootStackNavigator from "@/navigations/root-stack";
import { Provider } from "react-redux";

import store from "@/redux/store/store";

export default function App() {
  return (
    <Provider store={store}>
      <RootStackNavigator />
    </Provider>
  );
}
