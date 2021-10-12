import { useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Login, Signup, Chat } from 'components';
// import { fb } from 'service';
import { UseAuth, useResolved } from 'hooks';
import { ChatProvider } from 'context/chatContext';

export const App = () => {
  const history = useHistory();
  const { authUser } = UseAuth();
  const authResolve = useResolved(authUser);
  useEffect(() => {
    if (authResolve) {
      history.push(!!authUser ? '/' : '/login');
    }
  }, [authUser, authResolve, history]);

  return authResolve ? (
    <ChatProvider authUser={authUser}>
      <div className="app">
        <Switch>
          <Chat exact path="/" />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    </ChatProvider>
  ) : (
    <>Loading....</>
  );
};
