/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import "fontsource-ubuntu/cyrillic-300-normal.css";

import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";

import { Container } from "@material-ui/core";
import Intro from "./components/Intro";
import UsernameForm from "./components/UsernameForm";
import Profile from "./components/Profile";

import React, { useEffect, useState } from "react";
import axios from "axios";

let theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Ubuntu",
      // "Open Sans",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      // "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    // fontSize: 18,
  },
});
theme = responsiveFontSizes(theme);

// const USER_SERVICE_URL = "https://www.codewars.com/api/v1/users/";
const USER_SERVICE_URL = "https://api.github.com/users/";

function App() {
  const [data, setData] = useState({
    users: [{ avatar_url: null }],
    isFetching: false,
  });

  async function handleFetchClick(userName: string) {
    await fetchUser(userName);
    console.log("data ", JSON.stringify(data));
  }

  const fetchUser = async (userName: string) => {
    try {
      setData({ users: [], isFetching: true });
      console.log(USER_SERVICE_URL + userName);

      const response = await axios.get(userName, {
        baseURL: USER_SERVICE_URL,
        // headers: { "X-Requested-With": "XMLHttpRequest" },
      });
      console.log("response", response);

      setData({ users: [response.data], isFetching: false });
    } catch (e) {
      console.log(e);
      setData({ users: [], isFetching: false });
    }
  };

  const styles = {
    p: css`
      background-color: red;
    `,
    button: css`
      background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
      border-radius: 3;
      border: 0;
      color: white;
      height: 48px;
      padding: 0 30px;
      box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
    `,
  };
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Intro />

        <UsernameForm handleFetchClick={handleFetchClick} />

        {/* <Profile /> */}
      </Container>
    </ThemeProvider>
  );
}

export default App;
