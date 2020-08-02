import { NowRequest, NowResponse } from "@vercel/node";
import axios from "axios";

export default async (req: NowRequest, res: NowResponse) => {
  const {
    query: { user },
  } = req;

  if (Array.isArray(user)) {
    res.json({ error: "Arrays as parameter not supported" });
    return;
  }

  const fetchChallenges = async (userName: string) => {
    // TODO Read totalPages in responce and query rest of the pages
    try {
      const response = await axios.get(
        `https://www.codewars.com/api/v1/users/${userName}/code-challenges/completed?page=0`
      );
      return response;
    } catch (e) {
      res.json({ error: e });
    }
  };

  const axiosResponse = await fetchChallenges(user);

  res.json({ ...axiosResponse.data });
};
