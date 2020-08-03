/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";
import Typography from "@material-ui/core/Typography";

import LinkOutlinedIcon from "@material-ui/icons/LinkOutlined";
import Link from "@material-ui/core/Link";
import { Box } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

function Intro() {
  const theme = useTheme();

  const styles = {
    icon: css`
      color: ${theme.palette.grey[500]};
    `,
  };

  function Links() {
    return (
      <React.Fragment>
        <Link
          href="https://github.com/ungvert/codewars-api"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Box
            display="inline-flex"
            alignItems="center"
            color="grey.700"
            component="span"
          >
            <Typography variant="subtitle2" component="span">
              Исходный код
            </Typography>
            <LinkOutlinedIcon css={styles.icon} />
          </Box>
        </Link>
        <Link
          href="https://dev.codewars.com/#rest-api"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <Box display="inline-flex" alignItems="center" color="grey.700">
            <Typography variant="subtitle2" component="span">
              Codewars API
            </Typography>
            <LinkOutlinedIcon css={styles.icon} />
          </Box>
        </Link>
        <Link
          href="https://github.com/Codewars/codewars.com/wiki/Honor-&-Ranks"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <Box display="inline-flex" alignItems="center" color="grey.700">
            <Typography variant="subtitle2" component="span">
              Codewars Wiki
            </Typography>
            <LinkOutlinedIcon css={styles.icon} />
          </Box>
        </Link>
      </React.Fragment>
    );
  }

  return (
    <Box mt={8}>
      <Box my={3}>
        <Typography variant="h3" component="h1">
          Узнай сколько кат нужно&nbsp;выполнить чтобы повысить
          уровень&nbsp;в&nbsp;Codewars
        </Typography>

        <Box
          mt={4}
          display="flex"
          alignItems="flex-start"
          justifyContent="flex-start"
          flexWrap="wrap"
        >
          <Box mr={4} mb={2}>
            <Typography variant="subtitle1" component="p">
              Это приложение использует публичный Codewars API, чтобы получить
              данные профиля.
            </Typography>

            <Typography variant="subtitle1" component="p">
              Для расчета опыта используются данные из Codewars Wiki.
            </Typography>
          </Box>

          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Links />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Intro;
