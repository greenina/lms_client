import logo from './logo.svg';
import './App.css';
import FirstPage from './components/FirstPage';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/StudentLogin';
import StudentLogin from './components/StudentLogin';
import MainPage from './components/MainPage'
import ProfLogin from './components/ProfLogin';

function App() {
  return (
    <div>
        <BrowserRouter>
          <Switch>
          <Route path="/"exact={true}  component={FirstPage} />
          <Route path="/register" component={Register}/>
          <Route path="/studlogin" component={StudentLogin}/>
          <Route path="/proflogin" component={ProfLogin}/>
          <Route path="/main"exact={true} component={MainPage}/>
          </Switch>
        </BrowserRouter>
    </div>
  );
}


export default App;
