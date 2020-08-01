/** @jsx jsx */
import { jsx, css } from "@emotion/core";

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
  return (
    <Box>
      <Box my={2}>
        <Typography variant="h3" component="h1">
          Узнай сколько кат нужно выполнить чтобы повысить уровень в Codewars
        </Typography>
        <Box my={1}>
          <Typography variant="h6" component="p">
            Это веб приложение использует публичный Codewars API, чтобы получить
            данные профиля. Для расчета опыта используются данные из Codewars
            Wiki.
          </Typography>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="flex-start">
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
      </Box>
    </Box>
  );
}

export default Intro;
