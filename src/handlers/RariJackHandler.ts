import { Http } from "@angius/http";
import { json } from "../helpers/Response";
import { UrlBuilder } from "../helpers/UrlBuilder";
import { Env } from "../types/Env";
import { version } from "../../package.json";
import { DerpiResult } from "../types/Derpi";

export const RariJackHandler = async (
  request: Request,
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

    const whResponse = await Http.request<void>(
      env.DISCORD_WEBHOOK,
      "POST",
      {
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
      {},
      {},
      (r: Response) => Promise.resolve({})
    );

    if (whResponse.isSuccess) {
      const response = new URL(request.url).searchParams.has("v")
        ? { data }
        : { message: "Success!" };

      return json(response);
    } else {
      return new Response(`Error: ${res.error}`, { status: 500 });
    }
  } else {
    return new Response(`Error: ${res.error}`, { status: 500 });
  }
};
