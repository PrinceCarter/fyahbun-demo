import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const USERNAME = "fyahbuncreative";

export async function GET() {
  const debug: string[] = [];

  try {
    debug.push("Starting API fetch...");
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

    debug.push(`API status: ${res.status}`);

    if (!res.ok) {
      const body = await res.text();
      debug.push(`API body (first 300): ${body.slice(0, 300)}`);

      debug.push("Trying profile page...");
      const profileRes = await fetch(`https://www.instagram.com/${USERNAME}/`, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml",
          "Accept-Language": "en-US,en;q=0.9",
        },
      });

      debug.push(`Profile status: ${profileRes.status}`);
      const html = await profileRes.text();
      debug.push(`Profile HTML length: ${html.length}`);

      const shortcodeRegex = /"shortcode"\s*:\s*"([A-Za-z0-9_-]+)"/g;
      const shortcodes = new Set<string>();
      let match;
      while ((match = shortcodeRegex.exec(html)) !== null) {
        shortcodes.add(match[1]);
      }
      debug.push(`Found ${shortcodes.size} shortcodes`);

      if (shortcodes.size > 0) {
        const posts = Array.from(shortcodes).slice(0, 8).map((code) => ({
          image_url: `https://www.instagram.com/p/${code}/media/?size=m`,
          shortcode: code,
        }));
        return NextResponse.json({ images: posts, debug });
      }

      return NextResponse.json({ images: [], debug });
    }

    const json = await res.json();
    const user = json?.data?.user;
    debug.push(`User found: ${!!user}`);

    if (!user) {
      return NextResponse.json({ images: [], debug });
    }

    const edges = user.edge_owner_to_timeline_media?.edges ?? [];
    debug.push(`Edges count: ${edges.length}`);

    const posts = edges
      .slice(0, 8)
      .filter((e: { node: Record<string, unknown> }) => !e.node.is_video)
      .map((e: { node: Record<string, unknown> }) => ({
        image_url: (e.node.thumbnail_src as string) || (e.node.display_url as string) || "",
        shortcode: (e.node.shortcode as string) || "",
      }))
      .filter((p: { image_url: string }) => p.image_url);

    debug.push(`Final posts: ${posts.length}`);
    return NextResponse.json({ images: posts, debug });
  } catch (err) {
    debug.push(`Error: ${err instanceof Error ? err.message : String(err)}`);
    return NextResponse.json({ images: [], debug });
  }
}
