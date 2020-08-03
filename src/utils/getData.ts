import axios from "axios";

// Official API (http://www.codewars.com/api/v1/users/) not configured to allow CORS.
// My solution - proxy-api on backend, implementation in folder ./api
const USER_SERVICE_URL = "https://codewars-api.vercel.app/api/users/";

const USER_CHALLENGES_URL =
  "https://codewars-api.vercel.app/api/code-challenges/";

const fetchData = async (userName: string, baseURL: string) => {
  try {
    const response = await axios.get(userName, {
      baseURL,
    });

    if (response.hasOwnProperty("data")) {
      if (response.data.hasOwnProperty("error")) {
        return [JSON.stringify(response.data.error), null];
      } else {
        return [null, response.data];
      }
    }

    return ["API not returned data", null];
  } catch (e) {
    console.warn(e);
    return [e.message, null];
  }
};
const fetchUser = (userName: string, baseURL = USER_SERVICE_URL) =>
  fetchData(userName, baseURL);

const fetchChallenges = (userName: string, baseURL = USER_CHALLENGES_URL) =>
  fetchData(userName, baseURL);

// Data from https://github.com/Codewars/codewars.com/wiki/Honor-&-Ranks
const LEVEL_EXP_REQIREMENT = {
  "8 kyu": 0,
  "7 kyu": 20,
  "6 kyu": 76,
  "5 kyu": 229,
  "4 kyu": 643,
  "3 kyu": 1768,
  "2 kyu": 4829,
  "1 kyu": 13147,
  "1 dan": 35759,
  "2 dan": 97225,
};
const EXP_FOR_ONE_KATA = {
  "8 kyu": 2,
  "7 kyu": 3,
  "6 kyu": 8,
  "5 kyu": 21,
  "4 kyu": 55,
  "3 kyu": 149,
  "2 kyu": 404,
  "1 kyu": 1097,
};
const RANKS = [
  "8 kyu",
  "7 kyu",
  "6 kyu",
  "5 kyu",
  "4 kyu",
  "3 kyu",
  "2 kyu",
  "1 kyu",
  "1 dan",
  "2 dan",
];

const OVERALL_PROFILE_NAME = "профиля";

function prepareUserData(userData: UserAPIData | null) {
  if (userData) {
    // prepare which profiles we will load
    type ProfilesRaw = {
      name: string;
      data: LanguageData;
    };
    const profilesData: ProfilesRaw[] = [];
    profilesData.push({
      name: OVERALL_PROFILE_NAME,
      data: userData.ranks.overall,
    });
    Object.entries(userData.ranks.languages).forEach(
      ([languageName, languageData]) => {
        profilesData.push({ name: languageName, data: languageData });
      }
    );

    // enrich\transform each profile with new calculated data
    let preparedProfiles: ProfileProps[] = [];
    profilesData
      .slice()
      .sort(({ data: a }, { data: b }) => b.score - a.score)
      .forEach((profile) => {
        const { name: profileName, data: profileRawData } = profile;
        const profileData = prepareProfileData(profileRawData);
        if (profileData) {
          preparedProfiles.push({ profileName, ...profileData });
        }
      });

    return preparedProfiles;
  }
  return null;
}

function prepareProfileData(profileData: LanguageData) {
  if (profileData && profileData.name) {
    const rank = profileData.name as ProfileRanks;
    const exp = profileData.score;

    // Calculating exp for next level
    const rankIndex = RANKS.indexOf(rank);
    // TODO Edge case - not found index

    const rankNext = RANKS[rankIndex + 1] as ProfileRanks;
    // TODO Edge case - not found next index (max level 2 den)

    const expNextRank = LEVEL_EXP_REQIREMENT[rankNext];
    const expForLevelUp = LEVEL_EXP_REQIREMENT[rankNext] - exp;
    const expForLevelUpPercentage =
      (exp / LEVEL_EXP_REQIREMENT[rankNext]) * 100;

    const expTable: ProfileTableRow[] = Object.entries(EXP_FOR_ONE_KATA).map(
      ([kataRank, expForKata]) => {
        const katasForLevelUp = Math.ceil(expForLevelUp / expForKata);
        return { kataRank, expForKata, katasForLevelUp };
      }
    );

    return {
      rank,
      rankNext,
      exp,
      expNextRank,
      expForLevelUp,
      expForLevelUpPercentage,
      expTable,
    };
  }

  return null;
}

//*

function dateToYearMonthDay(dateInMiliseconds: number) {
  const zeroPad = (num: number, places = 2) =>
    String(num).padStart(places, "0");
  const date = new Date(dateInMiliseconds);
  return (
    date.getFullYear() +
    "-" +
    zeroPad(date.getMonth() + 1) +
    "-" +
    zeroPad(date.getDate())
  );
}

function generateBins(length = 43, height = 7) {
  //19 - min, 43 - max
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
      apiData: CodeChallengesDataItem[];
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
  return { binsForD3, dateIndex: dateIndex };
}

function prepareUserChallengesData(
  userChallengesData: ChallengesAPIData | null
) {
  if (userChallengesData) {
    const heatmapBinsLength = 43; //* days in week
    const heatmapBinsHeight = 7; //* days in week

    const { binsForD3: emptyBinsForD3, dateIndex } = generateBins(
      heatmapBinsLength,
      heatmapBinsHeight
    );

    //* Enriching d3 data with API data
    userChallengesData.data.forEach((obj) => {
      const date = obj.completedAt.split("T")[0];
      const binIndex = dateIndex.indexOf(date);
      if (binIndex > -1) {
        emptyBinsForD3[binIndex].apiData.push(obj);
        emptyBinsForD3[binIndex].bins.count++;
      }
    });

    //* From flat array forming sub-arrays with tree-like structure
    let binsForD3Filled: Bins[] = [];
    let formedBin: Bin[] = [];
    let binIndex = 0;
    let counter = 0;
    emptyBinsForD3 // TODO refactoring
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

    return binsForD3Filled;
  }
  return null;
}

export {
  fetchUser,
  prepareUserData,
  fetchChallenges,
  prepareUserChallengesData,
  OVERALL_PROFILE_NAME,
};
