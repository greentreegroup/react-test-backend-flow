import logo from './logo.svg';
import './App.css';
//import LoginButton from "./SignIn";
import ProtectedPage from "./ProtectedPage";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         GreenTree authorization tests 
        </p>
      </header>
	  <ProtectedPage />
    </div>
  );
}

export default App;
