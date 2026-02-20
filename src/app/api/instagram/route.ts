import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const USERNAME = "fyahbuncreative";
const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

interface IgPost {
  image_url: string;
  shortcode: string;
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
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        Referer: `https://www.instagram.com/${USERNAME}/`,
      },
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

async function tryProfilePage(): Promise<IgPost[]> {
  const res = await fetch(`https://www.instagram.com/${USERNAME}/`, {
    headers: {
      "User-Agent": BROWSER_UA,
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "en-US,en;q=0.9",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Dest": "document",
    },
  });
  if (!res.ok) return [];
  const html = await res.text();

  const shortcodeRegex = /"shortcode"\s*:\s*"([A-Za-z0-9_-]+)"/g;
  const shortcodes = new Set<string>();
  let match;
  while ((match = shortcodeRegex.exec(html)) !== null) {
    shortcodes.add(match[1]);
  }

  return Array.from(shortcodes)
    .slice(0, 8)
    .map((code) => ({
      image_url: `https://www.instagram.com/p/${code}/media/?size=m`,
      shortcode: code,
    }));
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

    return NextResponse.json({ images: posts.slice(0, 8) });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
