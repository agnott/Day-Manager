/**
  Application routing
**/
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

ReactDOM.render(
  <Router history={ReactRouter.browserHistory}>
    <Route path="/" component={WelcomeBox}/>
  </Router>
, document.getElementById('view'));
