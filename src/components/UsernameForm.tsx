/** @jsx jsx */
import { jsx } from "@emotion/core";
import Typography from "@material-ui/core/Typography";
import { Box, TextField, CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { KeyboardEvent, useState } from "react";

type CallbackFunction = (userName: string) => void;

type Props = {
  handleFetchClick: CallbackFunction;
  isFetchingData: boolean;
  fetchingError: string | null;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  requestedUser: string | null;
};
function UsernameForm({
  handleFetchClick,
  isFetchingData,
  fetchingError,
  userName,
  setUserName,
  requestedUser,
}: Props) {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      if (userName.length) {
        handleFetchClick(userName);
      } else setEmptyInputAttempt(true);
    }
  };

  const [emptyInputAttempt, setEmptyInputAttempt] = useState(false);

  return (
    <Box mt={3}>
      <Typography variant="h4" component="h2" gutterBottom>
        Введите имя\ссылку на профиль в Codewars:
      </Typography>

      <Box display="flex" alignItems="flex-start" color="grey.700" mt={2}>
        <Box mr={1} flexGrow={1}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Профиль в Codewars"
            variant="outlined"
            size="small"
            value={userName}
            onChange={(e) => {
              setEmptyInputAttempt(false);
              setUserName(e.currentTarget.value);
            }}
            error={
              (Boolean(fetchingError) && String(requestedUser) === userName) ||
              (emptyInputAttempt && userName.length === 0)
            }
            onFocus={(e) => setEmptyInputAttempt(false)}
            helperText={
              Boolean(fetchingError) && String(requestedUser) === userName
                ? `Не удалось загрузить данные пользователя`
                : ""
            }
            onKeyDown={handleKeyDown}
          />
        </Box>

        <Box flexShrink={0}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              if (userName.length) {
                handleFetchClick(userName);
              } else setEmptyInputAttempt(true);
              console.log("emptyInputAttempt", emptyInputAttempt);
            }}
            disabled={isFetchingData}
          >
            {isFetchingData && <CircularProgress size={20} color="secondary" />}
            {!isFetchingData && "Загрузить"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default UsernameForm;
