/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { MouseEvent, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
// import { useTheme } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import UsernameForm from "./UsernameForm";
import Profile from "./Profile";
import SuperExpressive from "super-expressive";
import Heatmap from "./Heatmap";
import mockData from "./mock-challenges.json";

import { fetchUser, prepareUserApiData } from "../utils/userData";

function Main() {
  function dateToYearMonthDay(dateInMiliseconds: number) {
    const zeroPad = (num: number, places = 2) =>
      String(num).padStart(places, "0");
    // new Date(Date.now()).getMonth()
    const date = new Date(dateInMiliseconds);
    // console.log(`${date.getFullYear()}${date.getMonth()}${date.getDay()}`);

    // return `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(
    //   date.getDate()
    // )}`;

    return (
      date.getFullYear() +
      "-" +
      zeroPad(date.getMonth() + 1) +
      "-" +
      zeroPad(date.getDate())
    );
  }

  function generateBins(length = 43, height = 7) {
    //19 - min
    //43 - max
    const dateNow = dateToYearMonthDay(Date.now());

    //* Forming calendar dates array
    const dateIndex = [dateNow];
    for (let day = 1; day < length * height; day++) {
      const date = new Date(Date.parse(dateIndex[dateIndex.length - 1]));
      const dateBefore = date.setDate(date.getDate() - 1);
      dateIndex.push(dateToYearMonthDay(dateBefore));
    }

    let bin = 0;

    //* Adding to calendar date some fileds, which is nesessesary for d3
    const binsForD3 = dateIndex.map((date, ix) => {
      const binObj: {
        bins: {
          bin: number;
          count: number;
        };
        date: string;
        apiData: CodeChallengesApiData[];
      } = {
        bins: { bin: bin, count: 0 },
        date: date,
        apiData: [],
      };

      if (bin >= height - 1) {
        bin = 0;
      } else bin++;

      return binObj;
    });

    console.log("binsForD3", binsForD3);
    console.log(binsForD3[7 + 1]);

    return { binsForD3, dateIndex: dateIndex };
  }

  const heatmapBinsLength = 43; //* days in week
  const heatmapBinsHeight = 7; //* days in week

  const { binsForD3: emptyBinsForD3, dateIndex } = generateBins(
    heatmapBinsLength,
    heatmapBinsHeight
  );

  //* Enriching d3 data with API data
  mockData.data.forEach((obj) => {
    const date = obj.completedAt.split("T")[0];
    const binIndex = dateIndex.indexOf(date);
    if (binIndex > -1) {
      emptyBinsForD3[binIndex].apiData.push(obj);
      emptyBinsForD3[binIndex].bins.count++;
    }
  });

  let binsForD3Filled: Bins[] = [];
  let formedBin: Bin[] = [];
  let binIndex = 0;

  //* //////////////////
  //* From flat array forming sub-arrays, for each week\row
  let counter = 0;
  emptyBinsForD3 // TODO refactoring - must be a better way
    .slice()
    .reverse()
    .forEach((obj) => {
      if (counter === heatmapBinsHeight) {
        binsForD3Filled.push({
          bin: binIndex,
          bins: formedBin,
        });
        binIndex++;
        formedBin = [];

        counter = 0;
      }
      formedBin.push({ ...obj.bins, date: obj.date });
      counter++;
    });

  binsForD3Filled.push({
    bin: binIndex,
    bins: formedBin,
  });

  console.log("binsForD3Filled", binsForD3Filled);

  const [data, setData] = useState<APIData>({
    userApiData: null,
    preparedUserData: null,
    isFetching: false,
    fetchingError: null,
    requestedUser: null,
  });
  const [userName, setUserName] = useState("");

  async function handleFetchClick(userName: string) {
    setData({
      userApiData: null,
      preparedUserData: null,
      isFetching: true,
      fetchingError: null,
      requestedUser: String(userName),
    });

    const [fetchingError, userData] = (await fetchUser(userName)) as [
      string | null,
      UserAPIData
    ];

    setData({
      userApiData: userData,
      preparedUserData: prepareUserApiData(userData),
      isFetching: false,
      fetchingError,
      requestedUser: String(userName),
    });
  }

  function InputExample() {
    return (
      <Box display="flex" alignItems="flex-start">
        <Typography variant="subtitle2" component="p">
          Например
        </Typography>

        <Box ml={1}>
          <Typography variant="subtitle2" component="p">
            <Link
              href="#"
              onClick={(e: MouseEvent) => {
                e.preventDefault();
                setUserName("ungvert");
              }}
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
      </Box>
    );
  }
  return (
    <Box mt={5} component="main">
      <UsernameForm
        handleFetchClick={handleFetchClick}
        isFetchingData={data.isFetching}
        fetchingError={data.fetchingError}
        userName={userName}
        setUserName={setUserName}
        requestedUser={data.requestedUser}
      />

      {!Boolean(userName) && <InputExample />}

      <Box mb={8} />
      {/* <Box
        display="flex"
        // justifyContent="flex-end"
        // alignItems="center"
        alignItems="flex-end"
        flexDirection="column"
        css={css`
          overflow: hidden;
        `}
      >
        <Heatmap
          // width={256}
          // height={128}
          width={722}
          height={112}
          events={true}
          binData={binsForD3Filled}
        />
      </Box> */}

      {data.preparedUserData &&
        data.preparedUserData.map((props) => (
          <Profile key={props.profileName} {...props} />
        ))}
    </Box>
  );
}

export default Main;
