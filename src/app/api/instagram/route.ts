import { NextResponse } from "next/server";

const USERNAME = "fyahbuncreative";
const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

interface IgPost {
  image_url: string;
  shortcode: string;
}

export const dynamic = "force-dynamic";

async function tryProfilePage(): Promise<IgPost[]> {
  const res = await fetch(`https://www.instagram.com/${USERNAME}/`, {
    headers: {
      "User-Agent": BROWSER_UA,
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "en-US,en;q=0.9",
    },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const html = await res.text();

  const posts: IgPost[] = [];
  const shortcodeRegex = /"shortcode"\s*:\s*"([A-Za-z0-9_-]+)"/g;
  const shortcodes = new Set<string>();
  let match;
  while ((match = shortcodeRegex.exec(html)) !== null) {
    shortcodes.add(match[1]);
  }

  for (const code of Array.from(shortcodes).slice(0, 12)) {
    posts.push({
      image_url: `https://www.instagram.com/p/${code}/media/?size=m`,
      shortcode: code,
    });
  }
  return posts;
}

async function tryApiEndpoint(): Promise<IgPost[]> {
  const res = await fetch(
    `https://www.instagram.com/api/v1/users/web_profile_info/?username=${USERNAME}`,
    {
      headers: {
        "User-Agent": "Instagram 275.0.0.27.98",
        "X-IG-App-ID": "936619743392459",
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: `https://www.instagram.com/${USERNAME}/`,
      },
      cache: "no-store",
    },
  );
  if (!res.ok) return [];
  const json = await res.json();
  const edges = json?.data?.user?.edge_owner_to_timeline_media?.edges ?? [];

  return edges
    .slice(0, 12)
    .filter((e: { node: Record<string, unknown> }) => !e.node.is_video)
    .map((e: { node: Record<string, unknown> }) => ({
      image_url: (e.node.thumbnail_src as string) || (e.node.display_url as string) || "",
      shortcode: (e.node.shortcode as string) || "",
    }))
    .filter((p: IgPost) => p.image_url);
}

async function inlineImages(posts: IgPost[]): Promise<IgPost[]> {
  return Promise.all(
    posts.slice(0, 8).map(async (p) => {
      try {
        const imgRes = await fetch(p.image_url, {
          headers: { "User-Agent": BROWSER_UA, Referer: "https://www.instagram.com/" },
          redirect: "follow",
        });
        if (!imgRes.ok) return p;
        const buf = Buffer.from(await imgRes.arrayBuffer());
        const ct = imgRes.headers.get("content-type") || "image/jpeg";
        return { ...p, image_url: `data:${ct};base64,${buf.toString("base64")}` };
      } catch {
        return p;
      }
    }),
  );
}

export async function GET() {
  try {
    let posts = await tryApiEndpoint();
    if (posts.length === 0) {
      posts = await tryProfilePage();
    }
    if (posts.length === 0) {
      return NextResponse.json({ images: [] });
    }
    const inlined = await inlineImages(posts);
    const valid = inlined.filter((p) => p.image_url.startsWith("data:"));
    return NextResponse.json({ images: valid.length > 0 ? valid : posts });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
