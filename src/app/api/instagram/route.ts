import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const USERNAME = "fyahbuncreative";

export async function GET() {
  try {
    // Fetch the public profile page HTML
    const profileRes = await fetch(`https://www.instagram.com/${USERNAME}/`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
      },
    });

    if (!profileRes.ok) {
      return NextResponse.json({ images: [] });
    }

    const html = await profileRes.text();

    // Try multiple patterns Instagram uses to embed post data
    const patterns = [
      /"shortcode"\s*:\s*"([A-Za-z0-9_-]+)"/g,
      /\/p\/([A-Za-z0-9_-]{10,})\//g,
      /"code"\s*:\s*"([A-Za-z0-9_-]+)"/g,
    ];

    const shortcodes = new Set<string>();

    for (const regex of patterns) {
      let match;
      while ((match = regex.exec(html)) !== null) {
        if (match[1].length >= 10 && match[1].length <= 12) {
          shortcodes.add(match[1]);
        }
      }
    }

    if (shortcodes.size === 0) {
      // Try the API as fallback (may work if not rate limited)
      try {
        const apiRes = await fetch(
          `https://www.instagram.com/api/v1/users/web_profile_info/?username=${USERNAME}`,
          {
            headers: {
              "User-Agent": "Instagram 275.0.0.27.98",
              "X-IG-App-ID": "936619743392459",
              Accept: "*/*",
              Referer: `https://www.instagram.com/${USERNAME}/`,
            },
          },
        );

        if (apiRes.ok) {
          const json = await apiRes.json();
          const edges = json?.data?.user?.edge_owner_to_timeline_media?.edges ?? [];
          const posts = edges
            .slice(0, 8)
            .filter((e: { node: Record<string, unknown> }) => !e.node.is_video)
            .map((e: { node: Record<string, unknown> }) => ({
              image_url: (e.node.thumbnail_src as string) || (e.node.display_url as string) || "",
              shortcode: (e.node.shortcode as string) || "",
            }))
            .filter((p: { image_url: string }) => p.image_url);

          if (posts.length > 0) {
            return NextResponse.json({ images: posts });
          }
        }
      } catch {
        // API fallback failed, continue
      }

      // Last resort: look for any Instagram CDN image URLs in the HTML
      const cdnRegex = /https:\/\/scontent[^"'\s]+\.jpg[^"'\s]*/g;
      const cdnUrls = new Set<string>();
      let cdnMatch;
      while ((cdnMatch = cdnRegex.exec(html)) !== null) {
        const url = cdnMatch[0].replace(/\\u0026/g, "&");
        if (!url.includes("profile_pic") && !url.includes("150x150")) {
          cdnUrls.add(url);
        }
      }

      if (cdnUrls.size > 0) {
        const posts = Array.from(cdnUrls).slice(0, 8).map((url, i) => ({
          image_url: url,
          shortcode: `post-${i}`,
        }));
        return NextResponse.json({ images: posts });
      }

      return NextResponse.json({ images: [] });
    }

    const posts = Array.from(shortcodes).slice(0, 8).map((code) => ({
      image_url: `https://www.instagram.com/p/${code}/media/?size=m`,
      shortcode: code,
    }));

    return NextResponse.json({ images: posts });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
