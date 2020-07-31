import { NowRequest, NowResponse } from "@vercel/node";
import axios from "axios";

const USER_SERVICE_URL = "https://www.codewars.com/api/v1/users/";

export default async (req: NowRequest, res: NowResponse) => {
  const {
    query: { user },
  } = req;

  if (Array.isArray(user)) {
    res.json({ error: "Arrays in parameter `user` not supported" });
    return;
  }

  //   res.setHeader("Access-Control-Allow-Origin", "*");

  const fetchUser = async (userName: string) => {
    try {
      console.log(USER_SERVICE_URL + userName);

      const response = await axios.get(userName, {
        baseURL: USER_SERVICE_URL,
      });
      return response;
    } catch (e) {
      console.log(e);
      res.json({ error: e });
    }
  };

  const axiosResponse = await fetchUser(user);
  //   console.log("axiosResponse ", axiosResponse.data);

  res.json({ data: axiosResponse.data });
};
