import "./App.css";

//react=router
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import MainTemplates from "./module/main/template/main.template";
import { authRoutes, mainRoutes, profileRoutes } from "./config/route.config";
import AuthTemplate from "./module/main/template/auth.template";
import Booking from "./module/main/pages/booking/booking.page";
import ProfileTemplate from "./module/main/template/profile.template";

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
  const renderProfileRoute = () => {
    return profileRoutes.map((route, index) => {
      const { Component, path, exact } = route;
      return (
        <Route path={path} exact={exact} key={index}>
          <ProfileTemplate>
            <Component />
          </ProfileTemplate>
        </Route>
      );
    });
  };
  return (
    <BrowserRouter>
      <Switch>
        {renderAuthRoute()}
        {renderMainRoute()}
        {renderProfileRoute()}
        <Route path="/booking/:id" exact="true">
          <Booking></Booking>
        </Route>
        {/* xử lý link sai */}
        <Route path="">
          <Redirect to="/"></Redirect>
        </Route>
      </Switch>
      {console.clear()}
    </BrowserRouter>
  );
}

export default App;
