import axios from "axios";

const USER_SERVICE_URL = "https://www.codewars.com/api/v1/users/";

const fetchUser = async (userName: string) => {
  try {
    const response = await axios.get(userName, {
      baseURL: USER_SERVICE_URL,
    });
    return [null, response];
  } catch (e) {
    return [e, null];
  }
};

export { fetchUser };
