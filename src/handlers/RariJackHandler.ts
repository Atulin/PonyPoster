import { Http, Getters, Method } from "@angius/http";
import { json } from "../helpers/Response";
import { UrlBuilder } from "../helpers/UrlBuilder";
import { Env } from "../types/Env";
import { version } from "../../package.json";
import { DerpiResult } from "../types/Derpi";

export const RariJackHandler = async (
  env: Env
): Promise<Response> => {
  const url = new UrlBuilder("https://derpibooru.org/api/v1/json/search/images")
    .query("q", "safe, rarijack, score.gt:100")
    .query("sf", "random")
    .query("sd", "descending")
    .query("per_page", "1")
    .query("key", env.DERPIBOORU_KEY)
    .build();

  const res = await Http.get<DerpiResult>(url, {
    "user-agent": `PonyPoster/${version} (just posting pony pics to Discord)`,
  });

  if (res.isSuccess) {
    const data = res.getValue();
    const image = data.images[0];

    const artists = image.tags
      .filter((t) => t.startsWith("artist"))
      .map((a) => a.split(":").reverse()[0]);

    const whResponse = await Http.request<void>({
      url: env.DISCORD_WEBHOOK,
      method: Method.post,
      payload: {
        username: "RariJack",
        avatar_url: image.representations.thumbTiny,
        embeds: [
          {
            title: `https://derpibooru.org/images/${image.id}`,
            color: 4934654,
            url: `https://derpibooru.org/images/${image.id}`,
            author: {
              name: artists.length > 0 ? artists.join(", ") : "Unknown artist",
            },
            image: {
              url: image.representations.large,
            },
          },
        ],
      },
      dataGetter: Getters.voidGetter
  });

    if (whResponse.isSuccess) {
      return json(data);
    } else {
      return new Response(`Error: ${res.error}`, { status: 500 });
    }
  } else {
    return new Response(`Error: ${res.error}`, { status: 500 });
  }
};
