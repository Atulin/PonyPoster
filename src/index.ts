import { RariJackHandler } from "./handlers/RariJackHandler";
import { Env } from "./types/Env";

export default {
  async scheduled(
    event: ScheduledEvent,
    env: Env,
    ctx: ExecutionContext
  ): Promise<void> {
    ctx.waitUntil(RariJackHandler(env));
  },

  async fetch(request: Request, env: Env) {
    return new Response("Working in CRON mode!");
  }
};
