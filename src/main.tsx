import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

import {
  UIKitSettingsBuilder,
  CometChatUIKit,
} from "@cometchat/chat-uikit-react";
import { setupLocalization } from "./CometChat/utils/utils";
import { BuilderSettingsProvider } from "./CometChat/context/BuilderSettingsContext";

export const COMETCHAT_CONSTANTS = {
  APP_ID: "273857f532cb70cd", // Replace with your App ID
  REGION: "in", // Replace with your App Region
  AUTH_KEY: "d1cb28f45a965943698f9f47aa936f3450752d1d", // Replace with your Auth Key or leave blank if you are authenticating using Auth Token
};

const uiKitSettings = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONSTANTS.APP_ID)
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
  .subscribePresenceForAllUsers()
  .build();

CometChatUIKit.init(uiKitSettings)?.then(() => {
  setupLocalization();

  const UID = "cometchat-uid-3"; // Replace with your actual UID

  CometChatUIKit.getLoggedinUser().then((user: CometChat.User | null) => {
    if (!user) {
      CometChatUIKit.login(UID)
        .then((loggedUser: CometChat.User) => {
          console.log("Login Successful:", loggedUser);
          // Mount your app
          ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
            <BuilderSettingsProvider>
              <App />
            </BuilderSettingsProvider>
          );
        })
        .catch((error) => console.error("Login Failed:", error));
    } else {
      console.log("User already logged in:", user);
      ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
        <BuilderSettingsProvider>
          <App />
        </BuilderSettingsProvider>
      );
    }
  });
});