import { NextResponse } from "next/server";

const IG_APP_ID = "936619743392459";
const IG_USER_AGENT = "Instagram 275.0.0.27.98";
const USERNAME = "fyahbuncreative";

interface IgPost {
  image_url: string;
  shortcode: string;
  caption: string;
  is_video: boolean;
}

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${USERNAME}`,
      {
        headers: {
          "User-Agent": IG_USER_AGENT,
          "X-IG-App-ID": IG_APP_ID,
          Accept: "*/*",
          "Accept-Language": "en-US,en;q=0.9",
          "Sec-Fetch-Site": "same-origin",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Dest": "empty",
          Referer: "https://www.instagram.com/fyahbuncreative/",
        },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return NextResponse.json({ images: [] }, { status: 200 });
    }

    const json = await res.json();
    const user = json?.data?.user;

    if (!user) {
      return NextResponse.json({ images: [] }, { status: 200 });
    }

    const edges =
      user.edge_owner_to_timeline_media?.edges ?? [];

    const rawPosts = edges
      .slice(0, 12)
      .map((edge: { node: Record<string, unknown> }) => {
        const node = edge.node;
        return {
          image_url:
            (node.thumbnail_src as string) ||
            (node.display_url as string) ||
            "",
          shortcode: (node.shortcode as string) || "",
          caption:
            (
              (
                node.edge_media_to_caption as {
                  edges: { node: { text: string } }[];
                }
              )?.edges?.[0]?.node?.text ?? ""
            ).slice(0, 100),
          is_video: Boolean(node.is_video),
        };
      })
      .filter((p: IgPost) => p.image_url && !p.is_video)
      .slice(0, 8);

    const posts = await Promise.all(
      rawPosts.map(async (p: IgPost) => {
        try {
          const imgRes = await fetch(p.image_url, {
            headers: {
              "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
              Referer: "https://www.instagram.com/",
            },
          });
          if (!imgRes.ok) return p;
          const buf = Buffer.from(await imgRes.arrayBuffer());
          const b64 = buf.toString("base64");
          const ct = imgRes.headers.get("content-type") || "image/jpeg";
          return { ...p, image_url: `data:${ct};base64,${b64}` };
        } catch {
          return p;
        }
      })
    );

    return NextResponse.json({ images: posts }, { status: 200 });
  } catch {
    return NextResponse.json({ images: [] }, { status: 200 });
  }
}
