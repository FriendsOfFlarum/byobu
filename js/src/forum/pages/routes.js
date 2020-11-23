import IndexPage from "flarum/components/IndexPage";
import PrivateDiscussionsUserPage from "./PrivateDiscussionsUserPage";

export default (app) => {
    app.routes.byobuUserPrivate = { path: '/u/:username/private', component: PrivateDiscussionsUserPage };
    app.routes.byobuPrivate = {path: '/private', component: IndexPage};
}
