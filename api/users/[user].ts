import { NowRequest, NowResponse } from "@vercel/node";
import axios from "axios";

const USER_SERVICE_URL = "https://www.codewars.com/api/v1/users/";

export default async (req: NowRequest, res: NowResponse) => {
  const {
    query: { user },
  } = req;

  if (Array.isArray(user)) {
    res.json({ error: "Arrays as parameter not supported" });
    return;
  }

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

  const [error, axiosResponse] = await fetchUser(decodeURIComponent(user));

  if (error) {
    res.json({ error });
  } else {
    if (axiosResponse.hasOwnProperty("data")) {
      res.json({ ...axiosResponse.data });
    } else {
      res.json({ error: "API responded without data" });
    }
  }
};
