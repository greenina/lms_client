import logo from './logo.svg';
import './App.css';
import FirstPage from './components/FirstPage';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/StudentLogin';
import StudentLogin from './components/StudentLogin';
import MainPage from './components/MainPage'

function App() {
  return (
    <div>
        <BrowserRouter>
          <Switch>
          <Route path="/"  component={FirstPage} />
          <Route path="/register" component={Register}/>
          <Route path="/login" component={StudentLogin}/>
          <Route path="/main" component={MainPage}/>
          </Switch>
        </BrowserRouter>
    </div>
  );
}


export default App;
