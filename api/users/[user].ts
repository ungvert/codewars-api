import { NowRequest, NowResponse } from "@vercel/node";
import { fetchUser } from "../_lib/fetchData";

export default async (req: NowRequest, res: NowResponse) => {
  const {
    query: { user },
  } = req;

  if (Array.isArray(user)) {
    res.status(400).send(new Error("Arrays as parameter not supported"));
    return;
  }

  const [error, axiosResponse] = await fetchUser(encodeURIComponent(user));

  if (error) {
    res.status(500).send(error);
  } else {
    if (axiosResponse.hasOwnProperty("data")) {
      res.status(200).json({ ...axiosResponse.data });
    } else {
      res.status(500).send(new Error("Codewars API responded without data"));
    }
  }
};
