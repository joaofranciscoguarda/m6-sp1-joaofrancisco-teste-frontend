import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Router from './routes';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router />
    </div>
  );
}

export default App;
