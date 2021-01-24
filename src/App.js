import logo from './logo.svg';
import './App.css';
import FirstPage from './components/FirstPage';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/StudentLogin';
import StudentLogin from './components/StudentLogin';
import ProfMain from './components/ProfMain'
import ProfLogin from './components/ProfLogin';
import StudMain from './components/StudMain'

function App() {

  return (
    <div>
        <BrowserRouter>
          <Switch>
          <Route path="/"exact={true}  component={FirstPage} />
          <Route path="/register" component={Register}/>
          <Route path="/studlogin" component={StudentLogin}/>
          <Route path="/proflogin" component={ProfLogin}/>
          <Route path="/profmain"exact={true} component={ProfMain}/>
          <Route path="/studmain"exact={true} component={StudMain}/>
          </Switch>
        </BrowserRouter>
    </div>
  );
}


export default App;
