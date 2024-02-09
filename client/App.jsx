import {store} from './store';
import {Provider} from 'react-redux';
import Navigation from './screens/navigation/Navigation';

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
