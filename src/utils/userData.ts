import axios from "axios";

// Official API (http://www.codewars.com/api/v1/users/) not configured to allow CORS.
// My solution - proxy-api on backend, implementation in folder ./api
const USER_SERVICE_URL = "https://codewars-api.vercel.app/api/users/";

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

const fetchUser = async (userName: string) => {
  try {
    const response = await axios.get(userName, {
      baseURL: USER_SERVICE_URL,
    });
    return [null, response.data];
  } catch (e) {
    console.warn(e);
    return [e.message, null];
  }
};

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

function prepareUserApiData(userData: UserAPIData) {
  if (userData) {
    // prepare which profiles we will load
    type ProfilesRaw = {
      name: string;
      data: LanguageData;
    };
    const profilesData: ProfilesRaw[] = [];
    profilesData.push({ name: "общий", data: userData.ranks.overall });
    Object.entries(userData.ranks.languages).forEach(
      ([languageName, languageData]) => {
        profilesData.push({ name: languageName, data: languageData });
      }
    );

    // enrich\transform each profile with new calculated data
    let preparedProfiles: ProfileProps[] = [];
    profilesData.forEach((profile) => {
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

export { fetchUser, prepareUserApiData };
