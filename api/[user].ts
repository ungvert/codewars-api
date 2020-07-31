import { NowRequest, NowResponse } from "@vercel/node";
import axios from "axios";

const USER_SERVICE_URL = "https://www.codewars.com/api/v1/users/";

export default async (req: NowRequest, res: NowResponse) => {
  const {
    query: { name },
  } = req;

  if (Array.isArray(name)) {
    res.json({ error: "Arrays in parameter `name` not supported" });
    return;
  }

  res.setHeader("Access-Control-Allow-Origin", "*");

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

  const axiosResponse = await fetchUser(name);
  console.log("axiosResponse ", axiosResponse);

  res.json({ axiosResponse });
  //   console.log("data ", JSON.stringify(data));

  //   res.json({ name: "John", email: "john@example.com" });
};
