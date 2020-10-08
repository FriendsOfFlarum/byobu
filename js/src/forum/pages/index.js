import routes from "./routes";
import PrivateDiscussionsPage from "./PrivateDiscussionsPage";

export default (app) => {
    routes(app);
    PrivateDiscussionsPage(app);
}
