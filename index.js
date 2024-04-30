/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';

import {ToastProvider} from 'react-native-toast-notifications';
import { store } from './src/redux/store';

const ReduxProvider = () => {
  return (
    <Provider store={store}>
      <ToastProvider 
    //    placement="bottom | top"
    // duration={5000}
    // animationType='slide-in | zoom-in'
    // animationDuration={250}
    // successColor="green"
    // dangerColor="red"
    // warningColor="orange"
    // normalColor="gray"
    // // icon={<Icon />}
    // // successIcon={<SuccessIcon />}
    // // dangerIcon={<DangerIcon />}
    // // warningIcon={<WarningIcon />}
    // textStyle={{ fontSize: 20 }}
    // offset={50} // offset for both top and bottom toasts
    // offsetTop={30}
    // offsetBottom={40}
    // swipeEnabled={true}
    // renderToast={(toastOptions) => JSX.Element}
    >
        <App />
      </ToastProvider>
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => ReduxProvider);
