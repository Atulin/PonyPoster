export const json = <T>(data: T, headers?: object) =>
  new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
      ...(headers ?? {})
    },
  });
