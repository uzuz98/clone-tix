import "./App.css";

//react=router
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import MainTemplates from "./module/template/main.template";
import {
  adminRoutes,
  authRoutes,
  mainRoutes,
  profileRoutes,
} from "./config/route.config";
import AuthTemplate from "./module/template/auth.template";
import Booking from "./module/main/pages/booking/booking.page";
import ProfileTemplate from "./module/template/profile.template";
import AdminTemplate from "./module/template/admin.template";
import GuardAdmin from "./hoc/guard-admin";
import GuardBooking from "./hoc/guard.booking";
import GuardAuth from "./hoc/guard.auth";

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
          <GuardAuth>
            <AuthTemplate>
              <Component />
            </AuthTemplate>
          </GuardAuth>
        </Route>
      );
    });
  };
  const renderProfileRoute = () => {
    return profileRoutes.map((route, index) => {
      const { Component, path, exact } = route;
      return (
        <Route path={path} exact={exact} key={index}>
          <GuardBooking>
            <ProfileTemplate>
              <Component />
            </ProfileTemplate>
          </GuardBooking>
        </Route>
      );
    });
  };
  const renderAdminRoute = () => {
    return adminRoutes.map((route, index) => {
      const { path, exact, Component } = route;
      return (
        <Route path={path} exact={exact} key={index}>
          <GuardAdmin>
            <AdminTemplate>
              <Component />
            </AdminTemplate>
          </GuardAdmin>
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
        {renderAdminRoute()}
        <Route path="/booking/:id" exact={true}>
          <GuardBooking>
            <Booking />
          </GuardBooking>
        </Route>
        {/* xử lý link sai */}
        <Route path="">
          <Redirect to="/"></Redirect>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
