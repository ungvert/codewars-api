import { NowRequest, NowResponse } from "@vercel/node";
import axios from "axios";

const USER_SERVICE_URL = "https://www.codewars.com/api/v1/users/";

export default async (req: NowRequest, res: NowResponse) => {
  const {
    query: { user },
  } = req;

  if (Array.isArray(user)) {
    res.status(500).send(new Error("Arrays as parameter not supported"));
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

  console.log("user:", user);
  console.log("decodeURIComponent(user):", decodeURIComponent(user));

  const [error, axiosResponse] = await fetchUser(decodeURIComponent(user));

  if (error) {
    res.status(500).send(error);
  } else {
    if (axiosResponse.hasOwnProperty("data")) {
      res.json({ ...axiosResponse.data });
    } else {
      res.status(500).send(new Error("API responded without data"));
    }
  }
};
