import "./App.css";

//react=router
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import MainTemplates from "./module/main/template/main.template";
import { authRoutes, mainRoutes } from "./config/route.config";
import AuthTemplate from "./module/main/template/auth.template";

function App() {
  const renderMainRoute = () => {
    return mainRoutes.map((route, index) => {
      const { Component, path, exact } = route;
      return (
        <Route path={path} exact={exact} key={index}>
          <MainTemplates>
            <Component />
          </MainTemplates>
        </Route>
      );
    });
  };
  const renderAuthRoute = () => {
    return authRoutes.map((route, index) => {
      const { Component, path, exact } = route;
      return (
        <Route path={path} exact={exact} key={index}>
          <AuthTemplate>
            <Component />
          </AuthTemplate>
        </Route>
      );
    });
  };
  return (
    <BrowserRouter>
      {console.clear()}
      <Switch>
        {renderAuthRoute()}
        {renderMainRoute()}
        {/* xử lý link sai */}
        <Route path="">
          <Redirect to="/"></Redirect>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
