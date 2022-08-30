// https://docs.videosdk.live/react/guide/video-and-audio-calling-api-sdk/quick-start

//What i followed : https://www.youtube.com/watch?v=kI3hJpMA9mo&t=241s
export const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJkMzdmZTkwZi00YWQ5LTQxNjgtYWVlYi05MGM2MzhkMjFiYWMiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY2MTgxNjY0MiwiZXhwIjoxNjYyNDIxNDQyfQ.z31cco2RGkXpL-N2d1x5c66MJ7_KU8Sw1EN7QCN_EyQ";
export const createMeeting = async () => {
  const res = await fetch(`https://api.videosdk.live/v1/meetings`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ region: "sg001" }),
  });

  const { meetingId } = await res.json();
  return meetingId;
};
export const fetchHlsDownstreamUrl = async ({ meetingId }) => {
  const res = await fetch(
    `https://api.videosdk.live/v2/hls/?roomId=${meetingId}`,
    {
      method: "GET",
      headers: {
        authorization: `${authToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  const json = await res.json();
  console.log(json);
  const { downstreamUrl } = json?.data[0];
  return downstreamUrl;
};
