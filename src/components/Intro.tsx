/** @jsx jsx */
import { jsx } from "@emotion/core";

import Typography from "@material-ui/core/Typography";

import LinkOutlinedIcon from "@material-ui/icons/LinkOutlined";
import Link from "@material-ui/core/Link";
import { Box } from "@material-ui/core";

function Intro() {
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
        <Link href="#">
          <Box
            display="inline-flex"
            alignItems="center"
            color="grey.700"
            component="span"
          >
            <Typography variant="subtitle1" component="span">
              Исходный код
            </Typography>
            <LinkOutlinedIcon />
          </Box>
        </Link>
        <Link href="#">
          <Box display="inline-flex" alignItems="center" color="grey.700">
            <Typography variant="subtitle1" component="span">
              Codewars API
            </Typography>
            <LinkOutlinedIcon />
          </Box>
        </Link>
        <Link href="#">
          <Box display="inline-flex" alignItems="center" color="grey.700">
            <Typography variant="h6" component="span">
              Codewars Wiki
            </Typography>
            <LinkOutlinedIcon />
          </Box>
        </Link>
      </Box>
    </Box>
  );
}

export default Intro;
