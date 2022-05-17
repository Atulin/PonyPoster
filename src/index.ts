import { RariJackHandler } from "./handlers/RariJackHandler";
import { Env } from "./types/Env";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {

    const url = new URL(request.url);
    const path = url.pathname;

    switch (path) {
      case "/rarijack":
        return await RariJackHandler(request, env);
      default:
        return new Response();
    }
  },
};
