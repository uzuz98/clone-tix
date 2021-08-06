import "./App.css";

//react=router
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import MainTemplates from "./module/main/template/main.template";
import { mainRoutes } from "./config/route.config";

function App() {
  const renderMainRoute = () => {
    return mainRoutes.map((route) => {
      const { Component, path, exact } = route;
      return (
        <Route path={path} exact={exact}>
          <MainTemplates>
            <Component />
          </MainTemplates>
        </Route>
      );
    });
  };
  return (
    <BrowserRouter>
      <Switch>
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
