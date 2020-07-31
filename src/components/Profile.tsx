/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import Typography from "@material-ui/core/Typography";

import LinkOutlinedIcon from "@material-ui/icons/LinkOutlined";
import Link from "@material-ui/core/Link";
import { Box, Container, TextField } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
});

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("8 kyu", 159, 6.0, 24, 4.0),
  createData("7 kyu", 237, 9.0, 37, 4.3),
  createData("6 kyu", 262, 16.0, 24, 6.0),
  createData("5 kyu", 305, 3.7, 67, 4.3),
  createData("4 kyu", 356, 16.0, 49, 3.9),
];

function SimpleTable() {
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
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Profile() {
  return (
    <Box my={3}>
      <Typography variant="h4" component="h2">
        Уровень профиля
      </Typography>

      <Box display="flex" alignItems="center" my={2}>
        <Typography variant="h6" component="span">
          7 kyu
        </Typography>
        <Box flexGrow={1} ml={1} mr={2}>
          <LinearProgress value={90} variant="determinate" />
        </Box>
        <Typography variant="h6" component="span">
          6 kyu
        </Typography>
      </Box>

      <Box my={2}>
        <Typography variant="h6" component="p">
          До нового уровня: 10 опыта.
        </Typography>

        <Box color="grey.700">
          <Typography variant="h6" component="p">
            Сейчас у вас 633 опыта. Новый уровень начинается с 643 опыта.
          </Typography>
        </Box>

        <Box my={1}>
          <Typography variant="h6" component="p">
            Чтобы повысить уровень профиля нужно решить:
          </Typography>
        </Box>

        <Box my={2}>
          <SimpleTable />
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
