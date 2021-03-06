/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { OVERALL_PROFILE_NAME } from "../utils/getData";

type SimpleTableProps = {
  rows: ProfileTableRow[];
};
function SimpleTable({ rows }: SimpleTableProps) {

  return (
    <TableContainer
      component={Paper}
      css={css`
        max-width: 420px;
      `}
    >
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Уровень каты</TableCell>
            <TableCell align="right">Опыт за 1 кату</TableCell>
            <TableCell align="right">
              Количество кат для нового уровня
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.kataRank}>
              <TableCell component="th" scope="row">
                {row.kataRank}
              </TableCell>
              <TableCell align="right">{row.expForKata}</TableCell>
              <TableCell align="right">{row.katasForLevelUp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function ProfileProgress({
  profileName,
  rank,
  rankNext,
  exp,
  expNextRank,
  expForLevelUp,
  expForLevelUpPercentage,
  expTable,
}: ProfileProps) {
  const theme = useTheme();

  return (
    <Box mt={5} mb={4}>
      <Typography variant="h5" component="h2">
        {profileName === OVERALL_PROFILE_NAME
          ? "Общий уровень профиля"
          : profileName}
      </Typography>

      <Box
        css={css`
          ${theme.breakpoints.up("sm")} {
            display: flex;
            align-items: flex-start;
            flex-wrap: wrap;
          }
        `}
      >
        <Box
          display="flex"
          alignItems="center"
          my={2}
          css={css`
            ${theme.breakpoints.up("sm")} {
              flex-grow: 1;
              flex-shrink: 0;
              margin-right: ${theme.spacing(6)}px;
              flex-basis: 35%;
            }
          `}
        >
          <Typography variant="h6" component="span">
            {rank}
          </Typography>
          <Box flexGrow={1} ml={1} mr={2}>
            <LinearProgress
              value={expForLevelUpPercentage}
              variant="determinate"
            />
          </Box>
          <Typography variant="h6" component="span">
            {rankNext}
          </Typography>
        </Box>

        <Box
          my={2}
          css={css`
            ${theme.breakpoints.up("sm")} {
              flex-shrink: 1;
              flex-grow: 0;
              flex-basis: 50%;
            }
          `}
        >
          <Typography variant="h6" component="p">
            До нового уровня: {expForLevelUp} опыта.
          </Typography>

          <Box color="grey.700">
            <Typography variant="subtitle2" component="p">
              Сейчас у вас {exp} опыта. Новый уровень начинается с {expNextRank}{" "}
              опыта.
            </Typography>
          </Box>

          <Box my={1}>
            <Typography variant="subtitle1" component="p">
              Чтобы повысить
              {profileName === OVERALL_PROFILE_NAME
                ? " общий уровень профиля "
                : ` уровень в языке ${profileName} `}
              нужно решить:
            </Typography>
          </Box>

          <Box my={2}>
            <SimpleTable rows={expTable} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProfileProgress;
