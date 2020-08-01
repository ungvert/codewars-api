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
      return response;
    } catch (e) {
      res.json({ error: e });
    }
  };

  const axiosResponse = await fetchUser(user);

  res.json({ ...axiosResponse });
};
