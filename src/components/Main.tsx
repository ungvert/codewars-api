/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { MouseEvent, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
// import { useTheme } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import UsernameForm from "./UsernameForm";
import Profile from "./Profile";
// import SuperExpressive from "super-expressive";
import Heatmap from "./Heatmap";
// import mockData from "./mock-challenges.json";

import {
  fetchUser,
  prepareUserData,
  fetchChallenges,
  prepareUserChallengesData,
} from "../utils/getData";

function Main() {
  const [data, setData] = useState<AppData>({
    userApiData: null,
    challengesData: null,
    preparedUserData: null,
    preparedChallengesData: null,
    isFetching: false,
    fetchingError: null,
    requestedUser: null,
  });
  const [userName, setUserName] = useState("");

  async function handleFetchClick(userName: string) {
    setData({
      userApiData: null,
      challengesData: null,
      preparedUserData: null,
      preparedChallengesData: null,
      isFetching: true,
      fetchingError: null,
      requestedUser: String(userName),
    });

    const [fetchingErrorUser, dataUser] = (await fetchUser(userName)) as [
      string | null,
      UserAPIData | null
    ];

    console.log("fetchingErrorUser, dataUser", fetchingErrorUser, dataUser);

    const [
      fetchingErrorChallenges,
      dataUserChallenges,
    ] = (await fetchChallenges(userName)) as [
      string | null,
      ChallengesAPIData | null
    ];

    setData({
      userApiData: dataUser,
      challengesData: dataUserChallenges,
      preparedUserData: prepareUserData(dataUser),
      preparedChallengesData: prepareUserChallengesData(dataUserChallenges),
      isFetching: false,
      fetchingError: fetchingErrorUser || fetchingErrorChallenges,
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

      <Box mb={8} mx={3} />
      {data.preparedChallengesData && (
        <Box
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
            binData={data.preparedChallengesData}
            // events={true}
          />
        </Box>
      )}

      {data.preparedUserData &&
        data.preparedUserData.map((props) => (
          <Profile key={props.profileName} {...props} />
        ))}
    </Box>
  );
}

export default Main;
