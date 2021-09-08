import HomeAdmin from "../module/admin/page/home/home-admin.page";
import AddMovie from "../module/admin/page/movie-add/add-movie.component";
import EditMovie from "../module/admin/page/movie-edit/edit-movie.component";
import ScheduleAdd from "../module/admin/page/schedule-add/schedule-add.page";
import ScheduleDelete from "../module/admin/page/schedule-delete/schedule-delete.page";
import UserAdd from "../module/admin/page/user-add/add-user.component";
import UserEdit from "../module/admin/page/user-edit/edit-user.component";
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
    path: "/movie-detail/:id",
    exact: true,
    Component: MovieDetail,
  },
];

export const authRoutes = [
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
];

export const profileRoutes = [
  {
    path: "/profile",
    exact: true,
    Component: Profile,
  },
];

export const adminRoutes = [
  {
    path: "/admin",
    exact: true,
    Component: HomeAdmin,
  },
  {
    path: "/admin/movie-management/add",
    exact: true,
    Component: AddMovie,
  },
  {
    path: "/admin/movie-management/edit",
    exact: true,
    Component: EditMovie,
  },
  {
    path: "/admin/user-management/add",
    exact: true,
    Component: UserAdd,
  },
  {
    path: "/admin/user-management/edit",
    exact: true,
    Component: UserEdit,
  },
  {
    path: "/admin/schedule/delete/:id",
    exact: true,
    Component: ScheduleDelete,
  },
  {
    path: "/admin/schedule/add/:id",
    exact: true,
    Component: ScheduleAdd,
  },
];
