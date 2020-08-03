import axios from "axios";

const fetchUser = async (userName: string) => {
  try {
    const response = await axios.get(
      `https://www.codewars.com/api/v1/users/${userName}`
    );
    return [null, response];
  } catch (e) {
    return [e, null];
  }
};

const fetchUserChallenges = async (userName: string) => {
  // TODO Read totalPages in responce and query rest of the pages
  try {
    const response = await axios.get(
      `https://www.codewars.com/api/v1/users/${userName}/code-challenges/completed?page=0`
    );
    return [null, response];
  } catch (e) {
    return [e, null];
  }
};

export { fetchUser, fetchUserChallenges };
