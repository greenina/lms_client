import logo from './logo.svg';
import './App.css';
import FirstPage from './components/FirstPage';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ClassPage from './components/ClassPage'
import MainPage from './components/MainPage'
import SubmitAssignment from './components/SubmitAssignment';
import NoticePage from './components/NoticePage';
import QuizPage from './components/QuizPage';

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
          {/* <Route path="/main/assignment/create" exact={true} component={CreateAssignment}/> */}
          <Route path="/main/assignment/submit" exact={true} component={SubmitAssignment}/>
          <Route path="/main/notice" exact={true} component={NoticePage}/>
          <Route path="/main/quiz" exact={true} component={QuizPage}/>
          </Switch>
        </BrowserRouter>
    </div>
  );
}


export default App;
