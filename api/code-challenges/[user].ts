import { NowRequest, NowResponse } from "@vercel/node";
import axios from "axios";

export default async (req: NowRequest, res: NowResponse) => {
  const {
    query: { user },
  } = req;

  if (Array.isArray(user)) {
    res.status(500).send(new Error("Arrays as parameter not supported"));
    return;
  }

  const fetchChallenges = async (userName: string) => {
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

  console.log("user:", user);
  console.log("decodeURIComponent(user):", decodeURIComponent(user));

  const [error, axiosResponse] = await fetchChallenges(
    decodeURIComponent(user)
  );

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
