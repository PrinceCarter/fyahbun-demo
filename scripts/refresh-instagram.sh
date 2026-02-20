#!/bin/bash
# Refresh Instagram photos from @fyahbuncreative
# Run: npm run refresh-ig

DIR="$(dirname "$0")/../public/instagram"
mkdir -p "$DIR"

curl -s "https://www.instagram.com/api/v1/users/web_profile_info/?username=fyahbuncreative" \
  -H "User-Agent: Instagram 275.0.0.27.98" \
  -H "X-IG-App-ID: 936619743392459" | python3 -c "
import sys, json, urllib.request, os

data = json.load(sys.stdin)
edges = data['data']['user']['edge_owner_to_timeline_media']['edges']
posts = []
for edge in edges[:12]:
    node = edge['node']
    if node.get('is_video'): continue
    url = node.get('thumbnail_src') or node.get('display_url')
    code = node.get('shortcode','')
    if not url: continue
    fname = os.path.join('$DIR', f'{code}.jpg')
    req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0','Referer':'https://www.instagram.com/'})
    with urllib.request.urlopen(req) as resp:
        with open(fname, 'wb') as f:
            f.write(resp.read())
    posts.append({'shortcode': code, 'file': f'/instagram/{code}.jpg'})
    print(f'  Downloaded: {code}.jpg')
with open(os.path.join('$DIR', 'posts.json'), 'w') as f:
    json.dump(posts, f, indent=2)
print(f'Done! {len(posts)} photos saved.')
"
