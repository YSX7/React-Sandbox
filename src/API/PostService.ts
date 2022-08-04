import { IComment, IPost } from "@/types/types";
import axios from "axios";

export default class PostService {
  static async getAll(limit = 10, page = 1) {
    const response = await axios.get<IPost[]>(
      "https://jsonplaceholder.typicode.com/posts",
      {
        params: {
          _limit: limit,
          _page: page,
        },
      }
    );
    return response;
  }

  static async getPostById(page = 1) {
    const response = await axios.get<IPost>(
      `https://jsonplaceholder.typicode.com/posts/${page}`
    );
    return response;
  }

  static async getCommentsByPostId(page = 1) {
    const response = await axios.get<IComment[]>(
      `https://jsonplaceholder.typicode.com/posts/${page}/comments`
    );
    return response;
  }
}
