import logo from './logo.svg';
import './App.css';
// import InputForm from './groupedForm';
import GroupComponent from './GroupComponent';
import { store } from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <GroupComponent />
      </div>
    </Provider>
  );
}

export default App;
