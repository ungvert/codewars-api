/// <reference types="react-scripts" />

type ProfileRanks =
  | "8 kyu"
  | "7 kyu"
  | "6 kyu"
  | "5 kyu"
  | "4 kyu"
  | "3 kyu"
  | "2 kyu"
  | "1 kyu"
  | "1 dan"
  | "2 dan";
type RankTypes = "overall" | "languages";

type Languages = "python" | "javascript" | "typescript";

type LanguageData = {
  rank: number;
  name: string;
  color: string;
  score: number;
};

type UserAPIData = {
  username: string;
  name: string | null;
  // honor: number;
  // clan: string;
  // leaderboardPosition: number;
  // skills: string;
  ranks: {
    overall: LanguageData;
    languages: {
      [k in Languages]: LanguageData;
    };
  };
  codeChallenges: {
    totalAuthored: number;
    totalCompleted: number;
  };
};

type APIData = {
  userApiData: UserAPIData | null;
  preparedUserData: ProfileProps[] | null;
  isFetching: boolean;
  fetchingError: string | null;
  requestedUser: string | null;
};

type ProfileTableRow = {
  kataRank: string;
  expForKata: number;
  katasForLevelUp: number;
};

type ProfileProps = {
  profileName: string;
  rank: ProfileRanks;
  rankNext: ProfileRanks;
  exp: number;
  expNextRank: number;
  expForLevelUp: number;
  expForLevelUpPercentage: number;
  expTable: ProfileTableRow[];
};

interface Bins {
  bin: number;
  bins: Bin[];
}

type Bin = {
  bin: number;
  count: number;
  date: string;
};


type CodeChallengesApiData = {
  id: string;
  name: string;
  slug: string;
  completedLanguages: string[];
  completedAt: string;
};
