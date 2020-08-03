/** @jsx jsx */
import { jsx } from "@emotion/core";

import Typography from "@material-ui/core/Typography";
import { Box, Link } from "@material-ui/core";

type ProfileProgressProps = {
  username: string;
  leaderboardPosition: number;
};
function ProfileIntro({ username, leaderboardPosition }: ProfileProgressProps) {
  const userURL = `https://www.codewars.com/users/${username}`;
  return (
    <Box my={4}>
      <Typography variant="h4" component="h4">
        {username}
      </Typography>

      <Typography variant="subtitle2" component="p">
        <Link href={userURL} target="_blank" rel="noopener noreferrer">
          {userURL}
        </Link>
      </Typography>

      <Typography variant="subtitle2" component="p">
        Позиция в общем рейтинге: {leaderboardPosition}
      </Typography>
    </Box>
  );
}

export default ProfileIntro;
