import logo from './logo.svg';
import './App.css';
import FirstPage from './components/FirstPage';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ClassPage from './components/ClassPage'
import MainPage from './components/MainPage'

function App() {

  return (
    <div>
        <BrowserRouter>
          <Switch>
          <Route path="/"exact={true}  component={FirstPage} />
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/main"exact={true} component={MainPage}/>
          <Route path="/classpage"exact={true} component={ClassPage}/>
          </Switch>
        </BrowserRouter>
    </div>
  );
}


export default App;
