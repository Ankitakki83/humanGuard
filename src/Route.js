import Loadable from "react-loadable";

const HomeContainer = Loadable({
  loader: () => import("./Home/Component/Home"),
  loading() {
    return <div>Loading...</div>;
  }
});

export default [
  {
    component: HomeContainer,
    path: "*"
  }
];
