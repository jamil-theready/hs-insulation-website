#!/usr/bin/env bash
# AI placeholder imagery via Pollinations (flux). Swap with real Heradio job photos later.
set -u
OUT="public/images"
mkdir -p "$OUT/hero" "$OUT/services" "$OUT/before-after" "$OUT/team" "$OUT/textures"
STYLE="photorealistic editorial photograph, natural lighting, sharp focus, high detail, no text, no watermark"

dl () { # name w h seed prompt
  local path="$1" w="$2" h="$3" seed="$4" prompt="$5"
  local enc
  enc=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1]))" "$prompt, $STYLE")
  local url="https://image.pollinations.ai/prompt/${enc}?width=${w}&height=${h}&seed=${seed}&nologo=true&model=flux"
  echo "-> $path"
  curl -sS -f --max-time 120 "$url" -o "$path" && sips -g pixelWidth "$path" >/dev/null 2>&1 && echo "   ok" || echo "   FAILED $path"
}

dl "$OUT/hero/hero-attic-sprayfoam.jpg"      1600 1000 11 "professional insulation contractor in white protective suit and respirator spraying expanding spray foam insulation onto the underside of an attic roof, dramatic worklight glow, dust particles in air"
dl "$OUT/hero/hero-truck.jpg"                1600 1000 12 "white contractor work truck with ladders parked in front of a suburban northern california home at golden hour, clean professional, residential driveway"
dl "$OUT/before-after/attic-before.jpg"      1000 750  21 "dirty old attic interior with thin patchy worn out fiberglass insulation between wood joists, dim, poor condition, before renovation"
dl "$OUT/before-after/attic-after.jpg"       1000 750  22 "clean attic interior with thick even fresh blown-in insulation covering the floor between wood joists, bright, well done professional finish"
dl "$OUT/services/spray-foam.jpg"            1000 750  31 "closeup of contractor applying yellow expanding spray foam insulation between wall studs with a spray gun, white protective suit"
dl "$OUT/services/blown-in.jpg"              1000 750  32 "contractor holding an insulation blower hose filling an attic floor with grey cellulose blown-in insulation, dust in worklight"
dl "$OUT/services/batt.jpg"                  1000 750  33 "contractor fitting pink fiberglass batt insulation rolls between wooden wall studs in a new home interior under construction"
dl "$OUT/services/vacuum-removal.jpg"        1000 750  34 "contractor using a large insulation vacuum hose to remove old dirty insulation from an attic, worklight, protective gear"
dl "$OUT/services/finished-beauty.jpg"       1000 750  35 "beautiful clean finished attic with neat even thick insulation, bright professional worklight, well lit, pristine"
dl "$OUT/team/crew-action.jpg"               1000 1100 41 "two insulation contractors in matching white protective suits and respirators working together installing insulation in a bright attic, candid teamwork"
dl "$OUT/textures/sprayfoam-closeup.jpg"     1200 800  51 "extreme macro closeup texture of cured cream colored spray foam insulation surface, organic bubbly pattern, soft light"
dl "$OUT/textures/batt-rolls.jpg"            1200 800  52 "stacked rolls of pink and white fiberglass batt insulation material in a warehouse, soft directional light, texture detail"
echo "DONE"
