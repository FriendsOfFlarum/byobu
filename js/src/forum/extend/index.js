import SettingsPage from "./SettingsPage";
import Discussion from "./Discussion";
import User from "./User";

export default (app) => {
    Discussion(app);
    SettingsPage(app);
    User(app);
}
