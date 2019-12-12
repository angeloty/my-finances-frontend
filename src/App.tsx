import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { BrowserRouter, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { library, IconLookup, IconName, IconDefinition, findIconDefinition } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { createStore, combineReducers } from "redux";
import { UserReducer } from "./modules/shared/reducers/UserReducer";
import { ApplicationContextReducer } from "./modules/shared/reducers/ApplicationContextReducer";
import { Provider } from "react-redux";
import UserModel from "./modules/shared/models/user";
import { resolve } from "react-resolver";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(fas);

const UserContext: {
  user: UserModel;
  token: string;
  updateUser: Function;
  updateToken: Function;
} = {
  user: new UserModel(),
  token: "",
  updateUser: (...args: any) => {},
  updateToken: (...args: any) => {}
};
export const AppContext = React.createContext(UserContext);

const appReducer = combineReducers({
  user: UserReducer,
  applicationContext: ApplicationContextReducer
});
export const appStore = createStore(appReducer);

export class App extends React.Component<
  any,
  {
    user: any;
    loadingUser: boolean;
    updateUser: Function;
    token: string;
    updateToken: Function;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      loadingUser: true,
      token: "",
      user: null,
      updateUser: this.updateUser,
      updateToken: this.updateToken
    };
  }
  componentDidMount = () => {
    try {
      if (!this.state.user) {
        const user = new UserModel();
        user.status().then((u: UserModel) => {
          this.updateUser(u);
          this.setState({
            loadingUser: false
          })
        },
        () => {          
          this.setState({
            loadingUser: false
          });
        });
      }
    } catch (e) {}
  };
  updateUser = (user: UserModel) => {
    this.setState({
      user
    });
  };
  updateToken = (token: string) => {
    this.setState({
      token
    });
    localStorage.setItem("app.token", token);
  };
  render = () => {
    const iconLookup: IconLookup = {
      prefix: "fas",
      iconName: "spinner" as IconName
    };
    const iconDefinition: IconDefinition = findIconDefinition(iconLookup);
    return (
      <Provider store={appStore}>
        <AppContext.Provider value={this.state}>
          {!this.state.loadingUser && (
            <BrowserRouter>
              <Route path="/" component={Layout} />
            </BrowserRouter>
          )}
          {this.state.loadingUser && (
            <div className="loader">
              <FontAwesomeIcon
                className="loader-icon"
                icon={iconDefinition}
              ></FontAwesomeIcon>
            </div>
          )}
        </AppContext.Provider>
      </Provider>
    );
  };
}

export default App;
