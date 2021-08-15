import Booking from "../module/main/pages/booking/booking.page";
import Home from "../module/main/pages/homes/home.page";
import MovieDetail from "../module/main/pages/movie-detail/movie-detail.page";
import Profile from "../module/main/pages/profile/profile.page";
import SignIn from "../module/main/pages/sign-in/sign-in.page";
import SignUp from "../module/main/pages/sign-up/sign-up.page";

export const mainRoutes = [
  {
    path: "/",
    exact: true,
    Component: Home,
  },
  {
    path: "/sign-in",
    exact: true,
    Component: SignIn,
  },
  {
    path: "/sign-up",
    exact: true,
    Component: SignUp,
  },
  {
    path: "/movie-detail/:id",
    exact: true,
    Component: MovieDetail,
  },
  {
    path: "/profile",
    exact: true,
    Component: Profile,
  },
  {
    path: "/booking/:id",
    exact: true,
    Component: Booking,
  },
];
