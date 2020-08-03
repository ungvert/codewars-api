/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
  responsiveFontSizes,
  StylesProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container } from "@material-ui/core";
import Intro from "./components/Intro";
import Main from "./components/Main";

import "fontsource-ubuntu/cyrillic-400-normal.css";

let theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Ubuntu",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
theme = responsiveFontSizes(theme);

function App() {
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container
            css={(theme) => css`
              padding: 0 8px;
              max-width: 960px;
              ${theme.breakpoints.up("sm")} {
                padding: 0 ${theme.spacing(3)}px;
              }
              ${theme.breakpoints.up("md")} {
                padding: 0 ${theme.spacing(5)}px;
              }
            `}
          >
            <Intro />

            <Main />
          </Container>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}

export default App;
