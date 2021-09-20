import LazyLoadComponent from "../module/lazyload/lazyload.component";
const Home = LazyLoadComponent(() =>
  import("../module/main/pages/homes/home.page").then(
    (module) => module.default
  )
);
const MovieDetail = LazyLoadComponent(() =>
  import("../module/main/pages/movie-detail/movie-detail.page").then(
    (module) => module.default
  )
);
const SignIn = LazyLoadComponent(() =>
  import("../module/main/pages/sign-in/sign-in.page").then(
    (module) => module.default
  )
);
const SignUp = LazyLoadComponent(() =>
  import("../module/main/pages/sign-up/sign-up.page").then(
    (module) => module.default
  )
);
const Profile = LazyLoadComponent(() =>
  import("../module/main/pages/profile/profile.page").then(
    (module) => module.default
  )
);
const UserAdd = LazyLoadComponent(() =>
  import("../module/admin/page/user-add/add-user.component").then(
    (module) => module.default
  )
);
const UserEdit = LazyLoadComponent(() =>
  import("../module/admin/page/user-edit/edit-user.component").then(
    (module) => module.default
  )
);
const ScheduleDelete = LazyLoadComponent(() =>
  import("../module/admin/page/schedule-delete/schedule-delete.page").then(
    (module) => module.default
  )
);
const ScheduleAdd = LazyLoadComponent(() =>
  import("../module/admin/page/schedule-add/schedule-add.page").then(
    (module) => module.default
  )
);
const EditMovie = LazyLoadComponent(() =>
  import("../module/admin/page/movie-edit/edit-movie.component").then(
    (module) => module.default
  )
);
const AddMovie = LazyLoadComponent(() =>
  import("../module/admin/page/movie-add/add-movie.component").then(
    (module) => module.default
  )
);
const HomeAdmin = LazyLoadComponent(() =>
  import("../module/admin/page/home/home-admin.page").then(
    (module) => module.default
  )
);

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
