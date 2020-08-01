/** @jsx jsx */
import { jsx } from "@emotion/core";

import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
});

type SimpleTableProps = {
  rows: ProfileTableRow[];
};
function SimpleTable({ rows }: SimpleTableProps) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Уровень каты</TableCell>
            <TableCell align="right">Опыт за 1 кату</TableCell>
            <TableCell align="right">Количество для нового уровня</TableCell>
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

function Profile({
  profileName,
  rank,
  rankNext,
  exp,
  expNextRank,
  expForLevelUp,
  expForLevelUpPercentage,
  expTable,
}: ProfileProps) {
  return (
    <Box my={3}>
      <Typography variant="h4" component="h2">
        Уровень {profileName}
      </Typography>

      <Box display="flex" alignItems="center" my={2}>
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

      <Box my={2}>
        <Typography variant="h6" component="p">
          До нового уровня: {expForLevelUp} опыта.
        </Typography>

        <Box color="grey.700">
          <Typography variant="h6" component="p">
            Сейчас у вас {exp} опыта. Новый уровень начинается с {expNextRank}{" "}
            опыта.
          </Typography>
        </Box>

        <Box my={1}>
          <Typography variant="h6" component="p">
            Чтобы повысить уровень {profileName} нужно решить:
          </Typography>
        </Box>

        <Box my={2}>
          <SimpleTable rows={expTable} />
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
