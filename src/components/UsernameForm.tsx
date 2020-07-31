/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Box, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useState } from "react";

type CallbackFunction = (userName: string) => void;

type Props = {
  handleFetchClick: CallbackFunction;
};
function UsernameForm({ handleFetchClick }: Props) {
  const [userName, setUserName] = useState("ungvert");
  return (
    <Box my={3}>
      <Typography variant="h4" component="h2" gutterBottom>
        Введите имя\ссылку на профиль в Codewars:
      </Typography>

      <Box display="flex" alignItems="center" color="grey.700" mt={2}>
        <Box mr={1}>
          <TextField
            id="outlined-basic"
            label="Профиль в Codewars"
            variant="outlined"
            size="small"
            value={userName}
            onChange={(e) => setUserName(e.currentTarget.value)}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            if (userName.length) {
              handleFetchClick(userName);
            }
          }}
        >
          Загрузить
        </Button>
      </Box>
      <Typography variant="h6" component="h2" gutterBottom>
        Например
        <Link
          href="#"
          underline="none"
          css={css`
            text-decoration-style: none;
            border-bottom: 1px dashed currentColor;
            display: inline-block;
            line-height: 1.3;
          `}
        >
          ungvert
        </Link>
      </Typography>
    </Box>
  );
}

export default UsernameForm;
