// ─── CHAIN PROFILES ──────────────────────────────────────────────────────────

const chainProfiles = {
  btc: {
    label: "BTC Ordinals",
    title: "BTC inscription study",
    color: "#d96c31",
    dark: "#1b1510",
    formats: ["SVG", "HTML", "PNG", "GIF"],
    defaultFormat: "SVG",
    sizeTarget: "~8 KB target",
    visualBias: "Vector experimental",
    technicalBias: "Inscription efficiency",
    metadataBias: "Sparse provenance",
    cultureBias: "Scarcity driven",
    metadataStandard: "Ordinals inscription note",
    palettes: [
      ["#18120e", "#d96c31", "#f7d87a", "#f6f3e8", "#2b2d2a"],
      ["#111111", "#ef7f2d", "#f2f2e8", "#89735c", "#c23821"],
      ["#201915", "#ffb44d", "#fff0c2", "#51463b", "#111111"],
    ],
    traits: {
      "Inscription Mode": ["Recursive SVG", "Single-file HTML", "Low-byte vector", "Tiny loop GIF"],
      "Conceptual Scarcity": ["1 sat relic", "Rare epoch mark", "Burnished provenance", "Minimal witness"],
      "Texture": ["Halftone dust", "Carved lines", "Terminal grain", "Etched glow"],
      "Motion": ["Static", "2-frame shimmer", "CSS pulse", "Block-height drift"],
    },
    // Stability AI prompt modifiers — shapes the image generation per chain culture
    imageStyleSuffix: "stark minimalist art, etched lines, limited palette, conceptual, bitcoin ordinals aesthetic, high contrast, collector artwork, no text, no watermark",
    imageNegativePrompt: "colorful, busy, crowded, marketplace, logo, watermark, text, signature, gradient background, photorealistic, 3d render",
    imageCfgScale: 8,
    imageSteps: 35,
    aiSystemPrompt: `You are an AI art director specialized in Bitcoin Ordinals. Your role is to interpret artwork prompts through the lens of BTC inscription culture and technical constraints.

Bitcoin Ordinals rules you follow:
- File size is sacred. Favor SVG and HTML over raster. Every byte matters.
- Aesthetics lean conceptual, minimal, experimental. Collectors value scarcity and provenance above visual complexity.
- On-chain permanence is the point. No off-chain dependencies. Self-contained artifacts only.
- Common formats: SVG (cleanest), HTML (interactive/generative), PNG (only when raster is essential), GIF (tiny animation loops only).
- Culturally: think rare sats, recursive inscriptions, parent-child relationships, Bitcoin block references.
- A single 1/1 inscription is more culturally resonant than a 10k PFP drop on BTC.

When the user provides a prompt, respond ONLY with a JSON object (no markdown, no extra text) with these exact fields:
{
  "aiTitle": string (evocative 3-5 word title in BTC Ordinals style),
  "aiReasoning": string (2-3 sentences explaining your chain-specific interpretation decisions),
  "recommendedFormat": "SVG" | "HTML" | "PNG" | "GIF",
  "estimatedKB": number (realistic estimate for inscription size),
  "inscriptionType": string (e.g. "recursive SVG", "single-file HTML art", "image/png"),
  "satRarity": string (e.g. "common sat", "uncommon sat", "rare sat — block 78000"),
  "visualDirection": string (brief: what visual elements suit this prompt on BTC),
  "culturalContext": string (brief: how this fits BTC collector culture),
  "imagePrompt": string (optimized Stability AI prompt for this artwork tuned for BTC ordinals aesthetics),
  "traits": [{ "trait_type": string, "value": string, "rarity": string }] (4 traits)
}`,
    decisions({ format, supply, optimize }) {
      return [
        `Uses ${format} as the primary artifact because Ordinals collectors value self-contained inscriptions.`,
        optimize
          ? "Compresses geometry, limits gradients, and favors reusable vector shapes to reduce byte weight."
          : "Keeps richer visual detail while still avoiding heavyweight asset dependencies.",
        supply > 1
          ? "Frames the collection as a scarce conceptual sequence with deterministic variants from a seed."
          : "Treats the output as a single provenance-first artwork rather than a marketplace PFP.",
        "Metadata stays compact and points to inscription behavior, not off-chain marketplace decoration.",
      ];
    },
  },

  eth: {
    label: "ETH NFTs",
    title: "ETH gallery-ready NFT",
    color: "#6f3dc1",
    dark: "#171125",
    formats: ["PNG", "SVG", "HTML", "GIF"],
    defaultFormat: "PNG",
    sizeTarget: "IPFS-ready quality",
    visualBias: "Polished detail",
    technicalBias: "Rich media package",
    metadataBias: "OpenSea traits",
    cultureBias: "Marketplace native",
    metadataStandard: "ERC-721 compatible JSON",
    palettes: [
      ["#121224", "#6f3dc1", "#b8a1ff", "#f3f0ff", "#00b8a9"],
      ["#171125", "#8a56ff", "#ffcc66", "#f8f6ff", "#2fd0c4"],
      ["#10172b", "#6f3dc1", "#f05d7b", "#f5f7ff", "#77d5ff"],
    ],
    traits: {
      "Archetype": ["1/1 hero", "PFP avatar", "Generative elite", "Gallery scene"],
      "Finish": ["Cinematic polish", "Oil-neon blend", "Hyper-detailed", "Editorial render"],
      "Marketplace Hook": ["Signature background", "Trait reveal", "Collector badge", "Animated edition"],
      "Lore Density": ["High", "Medium", "Mythic", "Seasonal"],
    },
    imageStyleSuffix: "highly detailed digital art, cinematic lighting, rich colors, nft artwork, gallery quality, octane render, 8k, professional illustration, dramatic atmosphere",
    imageNegativePrompt: "blurry, low quality, pixelated, watermark, text, logo, simple, flat, minimal, sketch, rough",
    imageCfgScale: 7,
    imageSteps: 40,
    aiSystemPrompt: `You are an AI art director specialized in Ethereum NFTs. Your role is to interpret artwork prompts through the lens of ETH NFT culture and marketplace expectations.

Ethereum NFT rules you follow:
- File size is not a constraint — IPFS handles large assets. Maximize visual quality.
- Aesthetics: polished, detailed, expressive. Think gallery-quality 1/1s or trait-rich PFP collections.
- Marketplace-ready means OpenSea-compatible metadata with rich trait layers and rarity tiers.
- Culture: storytelling, lore, artist identity, collector status. Long-term communities form around collections.
- ERC-721 for 1/1 and collections. ERC-1155 for editions. Animation via HTML/GIF adds premium value.
- For collections: design trait layers that generate meaningful rarity spreads.

When the user provides a prompt, respond ONLY with a JSON object (no markdown, no extra text) with these exact fields:
{
  "aiTitle": string (evocative 3-5 word title in ETH NFT gallery style),
  "aiReasoning": string (2-3 sentences explaining your chain-specific interpretation decisions),
  "recommendedFormat": "PNG" | "SVG" | "HTML" | "GIF",
  "resolution": string (e.g. "2048x2048", "3000x3000"),
  "storageType": "IPFS" | "Arweave" | "on-chain",
  "contractStandard": "ERC-721" | "ERC-1155",
  "visualDirection": string (brief: what visual style and detail level suits this prompt on ETH),
  "culturalContext": string (brief: how this fits ETH collector and marketplace culture),
  "imagePrompt": string (optimized Stability AI prompt for this artwork tuned for ETH NFT aesthetics — rich, detailed, cinematic),
  "traits": [{ "trait_type": string, "value": string, "rarity": string }] (5-6 traits with rarity %)
}`,
    decisions({ format, supply }) {
      return [
        `Prioritizes ${format} for a high-fidelity, marketplace-ready primary asset.`,
        "Adds richer trait metadata so the piece reads cleanly on OpenSea-style marketplaces.",
        supply > 1
          ? "Builds a rarity spread with premium-looking hero traits and collection-level consistency."
          : "Maximizes detail, lighting, and presentation for a strong 1/1 sale page.",
        "File size is treated as a packaging concern, with IPFS-style distribution assumed.",
      ];
    },
  },

  sol: {
    label: "SOL NFTs",
    title: "SOL drop-ready collection",
    color: "#087f8c",
    dark: "#071d21",
    formats: ["PNG", "SVG", "GIF", "HTML"],
    defaultFormat: "PNG",
    sizeTarget: "Fast mint assets",
    visualBias: "Clean generative",
    technicalBias: "Layered efficiency",
    metadataBias: "Metaplex traits",
    cultureBias: "Community drops",
    metadataStandard: "Metaplex compatible JSON",
    palettes: [
      ["#061c20", "#087f8c", "#28e0b9", "#f7fffb", "#f0b429"],
      ["#071d21", "#00c2a8", "#7a5cff", "#f7f7fb", "#ffcf5a"],
      ["#102326", "#16a085", "#70f2c4", "#ffffff", "#ee4266"],
    ],
    traits: {
      "Base Layer": ["Clean avatar", "Drop mascot", "Street profile", "Arena portrait"],
      "Community Signal": ["DAO patch", "Mint pass", "Founder mark", "Squad colorway"],
      "Background": ["Flat vibrant", "Speed lines", "Neon block", "Clean gradient"],
      "Scalability": ["Layered PNG", "Batch render", "Consistent seed", "Fast reveal"],
    },
    imageStyleSuffix: "clean digital illustration, vibrant colors, bold outlines, PFP NFT style, flat design, Solana NFT collection, modern, sharp, community artwork",
    imageNegativePrompt: "photorealistic, dark, gloomy, complex background, cluttered, watermark, text, logo, blurry, painterly, old",
    imageCfgScale: 7,
    imageSteps: 30,
    aiSystemPrompt: `You are an AI art director specialized in Solana NFTs. Your role is to interpret artwork prompts through the lens of Solana's fast, community-driven NFT culture.

Solana NFT rules you follow:
- Speed and scalability are core values. Assets should mint fast and reveal instantly.
- Aesthetics: clean, vibrant, modern. PFP-style collections dominate — bold silhouettes, consistent trait layers.
- Metaplex is the standard. Metadata must be Metaplex-compatible with clear attribute arrays.
- Culture: community-first, rapid drops, allowlists, Discord communities, holder utility.
- Collections of 3333, 5555, or 10000 are common. Compressed NFTs (cNFTs) are a cost-saving option.
- Trait layers: background, body/base, clothing, accessories, headwear, special.

When the user provides a prompt, respond ONLY with a JSON object (no markdown, no extra text) with these exact fields:
{
  "aiTitle": string (energetic 3-5 word collection name in SOL drop style),
  "aiReasoning": string (2-3 sentences explaining your chain-specific interpretation decisions),
  "recommendedFormat": "PNG" | "SVG" | "GIF" | "HTML",
  "mintSpeed": string (e.g. "~0.3s per item"),
  "storageType": "Arweave" | "IPFS" | "Shadow Drive",
  "traitLayers": number (how many distinct trait layers),
  "visualDirection": string (brief: what PFP/collection style suits this prompt on SOL),
  "culturalContext": string (brief: how this fits Solana community drop culture),
  "imagePrompt": string (optimized Stability AI prompt for this artwork tuned for SOL PFP/collection aesthetics — clean, vibrant, bold),
  "traits": [{ "trait_type": string, "value": string, "rarity": string }] (5-6 traits with rarity %)
}`,
    decisions({ format, supply }) {
      return [
        `Chooses ${format} with a layered trait model to keep minting and reveal flows quick.`,
        "Keeps silhouettes bold and repeatable so large sets remain visually consistent.",
        supply > 1
          ? "Expands into a drop-ready rarity table designed for fast community distribution."
          : "Still uses collection grammar so the single piece feels native to Solana culture.",
        "Metadata follows a clean Metaplex-style shape with attributes that batch well.",
      ];
    },
  },
};

// ─── STATE ────────────────────────────────────────────────────────────────────

// OpenAI model configs — each has different params & capabilities
const openAIModels = {
  "gpt-image-1": {
    label: "GPT Image 1",
    description: "Newest · best quality · instruction-following",
    size: "1024x1024",
    // gpt-image-1 uses quality: "low" | "medium" | "high"
    qualityMap: { balanced: "medium", premium: "high", compact: "low" },
    supportsStyle: false,
    supportsNegative: false,
    responseFormat: "b64_json",
  },
  "dall-e-3": {
    label: "DALL·E 3",
    description: "Reliable · vivid or natural style",
    size: "1024x1024",
    // dall-e-3 uses quality: "standard" | "hd"
    qualityMap: { balanced: "standard", premium: "hd", compact: "standard" },
    supportsStyle: true,   // "vivid" | "natural"
    supportsNegative: false,
    responseFormat: "b64_json",
  },
  "dall-e-2": {
    label: "DALL·E 2",
    description: "Fastest · cheapest · simple prompts",
    size: "1024x1024",
    qualityMap: {},        // dall-e-2 has no quality param
    supportsStyle: false,
    supportsNegative: false,
    responseFormat: "b64_json",
  },
};

const state = {
  chain: "btc",
  nonce: 0,
  output: null,
  aiData: null,
  isGeneratingAI: false,
  isGeneratingImage: false,
  lastAICallKey: "",
  openaiApiKey: localStorage.getItem("openai_api_key") || "",
  selectedModel: localStorage.getItem("openai_model") || "gpt-image-1",
  currentImageUrl: null,
};

// ─── ELEMENT REFS ─────────────────────────────────────────────────────────────

const $ = (id) => document.getElementById(id);

const elements = {
  chainFocus: $("chainFocus"),
  promptInput: $("promptInput"),
  supplyInput: $("supplyInput"),
  formatInput: $("formatInput"),
  seedInput: $("seedInput"),
  qualityInput: $("qualityInput"),
  inscriptionToggle: $("inscriptionToggle"),
  inscriptionToggleRow: $("inscriptionToggleRow"),
  generateBtn: $("generateBtn"),
  refreshBtn: $("refreshBtn"),
  downloadArtBtn: $("downloadArtBtn"),
  downloadMetaBtn: $("downloadMetaBtn"),
  outputTitle: $("outputTitle"),
  artFrame: $("artFrame"),
  formatBadge: $("formatBadge"),
  sizeBadge: $("sizeBadge"),
  supplyBadge: $("supplyBadge"),
  visualBias: $("visualBias"),
  technicalBias: $("technicalBias"),
  metadataBias: $("metadataBias"),
  cultureBias: $("cultureBias"),
  decisionList: $("decisionList"),
  traitList: $("traitList"),
  raritySummary: $("raritySummary"),
  collectionGrid: $("collectionGrid"),
  collectionCount: $("collectionCount"),
  metadataPreview: $("metadataPreview"),
  metadataStandard: $("metadataStandard"),
  aiPanel: $("aiPanel"),
  aiStatus: $("aiStatus"),
  aiReasoning: $("aiReasoning"),
  aiSpecs: $("aiSpecs"),
  aiTitleDisplay: $("aiTitleDisplay"),
  // API key UI
  apiKeyInput: $("apiKeyInput"),
  apiKeySaveBtn: $("apiKeySaveBtn"),
  apiKeyStatus: $("apiKeyStatus"),
  imageStatus: $("imageStatus"),
};

// ─── UTILITIES ────────────────────────────────────────────────────────────────

function hashString(input) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let n = value;
    n = Math.imul(n ^ (n >>> 15), n | 1);
    n ^= n + Math.imul(n ^ (n >>> 7), n | 61);
    return ((n ^ (n >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(items, random) {
  return items[Math.floor(random() * items.length) % items.length];
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c])
  );
}

function promptKeywords(prompt) {
  return prompt.toLowerCase().replace(/[^a-z0-9\s-]/g, "").split(/\s+/).filter((w) => w.length > 3).slice(0, 8);
}

// ─── SVG GENERATOR (placeholder / fallback) ───────────────────────────────────

function buildTraits(profile, random, supply) {
  return Object.entries(profile.traits).map(([trait_type, values]) => {
    const rarity = supply > 1 ? Math.max(1, Math.round(random() * 100)) : 100;
    return { trait_type, value: pick(values, random), rarity: supply > 1 ? `${rarity}%` : "edition trait" };
  });
}

function createSvg({ profile, prompt, traits, variant, format, quality, optimize, seed }) {
  const random = seededRandom(hashString(`${seed}-${profile.label}-${variant}-${prompt}-${quality}`));
  const palette = pick(profile.palettes, random);
  const [base, primary, secondary, paper, signal] = palette;
  const words = promptKeywords(prompt);
  const compact = profile.label.startsWith("BTC") && optimize;
  const detailCount = compact ? 10 : profile.label.startsWith("ETH") ? 34 : 22;
  const shapeCount = profile.label.startsWith("SOL") ? 18 : detailCount;
  const lines = [];
  const title = escapeHtml(words.slice(0, 3).join(" ") || "chain native artwork");
  const chain = profile.label.split(" ")[0];

  for (let i = 0; i < shapeCount; i++) {
    const x = Math.round(random() * 900);
    const y = Math.round(random() * 900);
    const r = Math.round(10 + random() * (compact ? 34 : 90));
    const opacity = (0.12 + random() * 0.55).toFixed(2);
    const color = pick([primary, secondary, signal, paper], random);
    if (profile.label.startsWith("SOL")) {
      lines.push(`<rect x="${x}" y="${y}" width="${r * 2}" height="${Math.max(18, r)}" fill="${color}" opacity="${opacity}" transform="rotate(${Math.round(random() * 20 - 10)} ${x} ${y})"/>`);
    } else if (profile.label.startsWith("ETH")) {
      lines.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="${opacity}"/>`);
    } else {
      lines.push(`<path d="M${x} ${y}l${r} ${Math.round(random() * 80 - 40)}l${Math.round(random() * -90)} ${r}z" fill="${color}" opacity="${opacity}"/>`);
    }
  }

  const traitText = traits.map((t) => `${t.trait_type}: ${t.value}`).join(" | ");
  const glow = profile.label.startsWith("ETH") ? `<filter id="glow"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>` : "";
  const btcMotion = format === "GIF" || format === "HTML" ? `<animateTransform attributeName="transform" type="rotate" from="0 500 500" to="4 500 500" dur="6s" repeatCount="indefinite" additive="sum"/>` : "";
  const solLayer = profile.label.startsWith("SOL") ? `<g opacity=".9"><rect x="260" y="230" width="480" height="540" rx="40" fill="${paper}"/><rect x="310" y="300" width="380" height="340" rx="28" fill="${base}"/><circle cx="500" cy="410" r="92" fill="${primary}"/><path d="M390 565c70-95 150-95 220 0v105H390z" fill="${secondary}"/></g>` : "";
  const ethLayer = profile.label.startsWith("ETH") ? `<g filter="url(#glow)"><path d="M500 180c115 80 178 178 178 300 0 168-81 270-178 344-97-74-178-176-178-344 0-122 63-220 178-300z" fill="${paper}" opacity=".95"/><path d="M500 260l115 220-115 72-115-72z" fill="${primary}"/><path d="M500 570l115-70-115 178-115-178z" fill="${secondary}"/></g>` : "";
  const btcLayer = profile.label.startsWith("BTC") ? `<g><rect x="302" y="238" width="396" height="524" fill="none" stroke="${paper}" stroke-width="${compact ? 10 : 18}"/><path d="M395 320h150c78 0 126 34 126 92 0 42-22 69-62 83 50 13 78 46 78 95 0 70-55 110-140 110H395z" fill="${primary}"/><path d="M455 382h80c36 0 58 15 58 43s-22 43-58 43h-80zm0 150h95c40 0 65 17 65 50s-25 50-65 50h-95z" fill="${base}"/></g>` : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" role="img" aria-label="${title}">
  <defs>
    ${glow}
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${base}"/><stop offset="1" stop-color="${profile.dark}"/></linearGradient>
    <pattern id="grid" width="${compact ? 80 : 46}" height="${compact ? 80 : 46}" patternUnits="userSpaceOnUse"><path d="M0 .5H${compact ? 80 : 46}M.5 0V${compact ? 80 : 46}" stroke="${paper}" stroke-opacity=".12"/></pattern>
  </defs>
  <rect width="1000" height="1000" fill="url(#bg)"/>
  <rect width="1000" height="1000" fill="url(#grid)"/>
  <g opacity=".95">${lines.join("")}${btcMotion}</g>
  ${btcLayer}${ethLayer}${solLayer}
  <path d="M120 828c170-70 322-70 456 0s232 70 304 0" fill="none" stroke="${signal}" stroke-width="${compact ? 8 : 16}" opacity=".8"/>
  <text x="64" y="90" fill="${paper}" font-family="monospace" font-size="${compact ? 28 : 34}" font-weight="800">${chain} / ${escapeHtml(format)}</text>
  <text x="64" y="940" fill="${paper}" font-family="monospace" font-size="${compact ? 20 : 25}" opacity=".82">${escapeHtml(traitText.slice(0, 92))}</text>
</svg>`.trim();
}

function createHtmlArt(svg, profile) {
  return `<!doctype html><html><head><meta charset="UTF-8"><style>html,body{margin:0;height:100%;background:${profile.dark};display:grid;place-items:center}svg{width:min(100vmin,1000px);height:auto}@keyframes drift{50%{filter:hue-rotate(18deg) saturate(1.2)}}body{animation:drift 5s infinite}</style></head><body>${svg}</body></html>`.trim();
}

function createMetadata({ profile, prompt, supply, format, quality, optimize, traits, seed }) {
  const base = {
    name: `${profile.label} - ${promptKeywords(prompt).slice(0, 3).join(" ") || "ChainNative"} #001`,
    description: `${profile.label} adaptive artwork generated from: "${prompt}".`,
    chain_profile: profile.label,
    output_format: format,
    supply,
    generation_seed: seed,
    attributes: traits.map(({ trait_type, value }) => ({ trait_type, value })),
  };

  if (profile.label.startsWith("BTC")) {
    return { ...base, inscription: { artifact: optimize ? "byte-optimized self-contained artifact" : "high-quality self-contained artifact", recommended_content_type: format === "HTML" ? "text/html" : format === "SVG" ? "image/svg+xml" : `image/${format.toLowerCase()}`, compression_mode: optimize ? "low-size" : quality } };
  }
  if (profile.label.startsWith("ETH")) {
    return { ...base, image: "ipfs://<generated-artwork-cid>", animation_url: format === "HTML" || format === "GIF" ? "ipfs://<generated-animation-cid>" : undefined, external_url: "https://chainnative.example/eth/drop", marketplace: { standard: "ERC-721", display_type: "OpenSea compatible", collection_strategy: supply > 1 ? "rarity-weighted collection" : "1/1 gallery piece" } };
  }
  return { ...base, image: "https://arweave.net/<generated-asset-id>", properties: { files: [{ uri: "https://arweave.net/<generated-asset-id>", type: `image/${format.toLowerCase()}` }], category: "image", creators: [{ address: "<creator-wallet>", share: 100 }] }, collection: { name: "ChainNative SOL Drop", family: "ChainNative", strategy: supply > 1 ? "layered batch mint" : "single drop-ready edition" } };
}

// ─── OPENAI IMAGE GENERATION ──────────────────────────────────────────────────

async function generateOpenAIImage(imagePrompt, chain) {
  const profile = chainProfiles[chain];
  const apiKey = state.openaiApiKey;
  const modelId = state.selectedModel;
  const modelCfg = openAIModels[modelId];

  if (!apiKey) { setImageStatus("no-key"); return null; }

  const fullPrompt = `${imagePrompt}, ${profile.imageStyleSuffix}`;
  const quality = elements.qualityInput?.value || "balanced";

  setImageStatus("loading", modelCfg.label);

  // Build request body — each model has different valid params
  const body = {
    model: modelId,
    prompt: fullPrompt,
    n: 1,
    size: modelCfg.size,
    response_format: modelCfg.responseFormat,
  };

  if (modelId === "gpt-image-1") {
    body.quality = modelCfg.qualityMap[quality] || "medium";
  } else if (modelId === "dall-e-3") {
    body.quality = modelCfg.qualityMap[quality] || "standard";
    // Vivid suits ETH/SOL energy; natural suits BTC's restrained aesthetic
    body.style = chain === "btc" ? "natural" : "vivid";
  }
  // dall-e-2: no quality or style param

  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error("OpenAI image error:", response.status, err);
      if (response.status === 401) setImageStatus("auth-error");
      else if (response.status === 429) setImageStatus("rate-limit");
      else setImageStatus("error", err?.error?.message);
      return null;
    }

    const data = await response.json();
    const b64 = data.data?.[0]?.b64_json;
    if (!b64) { setImageStatus("error", "No image in response"); return null; }

    const url = `data:image/png;base64,${b64}`;
    state.currentImageUrl = url;
    setImageStatus("done", modelCfg.label);
    return url;

  } catch (err) {
    console.error("OpenAI fetch failed:", err);
    setImageStatus("error", err.message);
    return null;
  }
}

function setImageStatus(status, extra) {
  const el = elements.imageStatus;
  if (!el) return;
  const modelLabel = openAIModels[state.selectedModel]?.label || "OpenAI";
  const messages = {
    "idle": "",
    "no-key": "Add your OpenAI API key below to generate real artwork",
    "loading": `Generating with ${extra || modelLabel}…`,
    "done": `Generated with ${extra || modelLabel}`,
    "error": `Generation failed${extra ? ` — ${extra}` : ""} · showing placeholder`,
    "auth-error": "Invalid API key — check and save again",
    "rate-limit": "Rate limit hit — wait a moment and try again",
  };
  el.textContent = messages[status] || "";
  el.dataset.status = status;
}

function showImageInFrame(url) {
  const img = document.createElement("img");
  img.src = url;
  img.alt = "AI generated NFT artwork";
  img.style.cssText = "display:block;width:min(88%,720px);aspect-ratio:1;object-fit:cover;box-shadow:0 22px 70px rgba(0,0,0,0.38);";
  elements.artFrame.innerHTML = "";
  elements.artFrame.appendChild(img);
}

function showSvgInFrame(svg, format, html) {
  if (format === "HTML") {
    elements.artFrame.innerHTML = `<iframe title="Generated HTML art preview"></iframe>`;
    elements.artFrame.querySelector("iframe").srcdoc = html;
  } else {
    elements.artFrame.innerHTML = svg;
  }
}

// ─── CLAUDE AI INTERPRETATION ─────────────────────────────────────────────────

async function callClaudeAI(prompt, chain, supply, format, optimize) {
  const profile = chainProfiles[chain];
  const userMessage = `Art prompt: "${prompt}"
Supply: ${supply} ${supply > 1 ? "item collection" : "single artwork"}
Chosen format: ${format}
${chain === "btc" && optimize ? "Inscription optimization: ON (minimize byte size)" : ""}

Generate the chain-native art direction and an optimized Stability AI image prompt for this.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: profile.aiSystemPrompt,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!response.ok) throw new Error(`Claude API error: ${response.status}`);
  const data = await response.json();
  const text = data.content?.find((b) => b.type === "text")?.text || "{}";
  return JSON.parse(text.replace(/```json|```/g, "").trim());
}

function setAIStatus(status) {
  const panel = elements.aiPanel;
  if (!panel) return;
  panel.dataset.status = status;
  const messages = {
    idle: "AI interpretation layer ready",
    loading: "AI interpreting chain constraints…",
    done: "AI chain interpretation complete",
    error: "AI unavailable — showing generative defaults",
  };
  if (elements.aiStatus) elements.aiStatus.textContent = messages[status] || "";
  if (status === "loading") {
    if (elements.aiReasoning) elements.aiReasoning.textContent = "";
    if (elements.aiSpecs) elements.aiSpecs.innerHTML = "";
    if (elements.aiTitleDisplay) elements.aiTitleDisplay.textContent = "";
  }
}

function renderAIData(aiData, chain) {
  if (!aiData) return;
  state.aiData = aiData;

  if (elements.aiTitleDisplay && aiData.aiTitle) elements.aiTitleDisplay.textContent = aiData.aiTitle;
  if (aiData.aiTitle) elements.outputTitle.textContent = aiData.aiTitle;
  if (elements.aiReasoning && aiData.aiReasoning) elements.aiReasoning.textContent = aiData.aiReasoning;

  const specs = [];
  if (chain === "btc") {
    if (aiData.recommendedFormat) specs.push(["Format", aiData.recommendedFormat]);
    if (aiData.estimatedKB) specs.push(["Est. size", `${aiData.estimatedKB} KB`]);
    if (aiData.inscriptionType) specs.push(["Inscription", aiData.inscriptionType]);
    if (aiData.satRarity) specs.push(["Sat", aiData.satRarity]);
  } else if (chain === "eth") {
    if (aiData.recommendedFormat) specs.push(["Format", aiData.recommendedFormat]);
    if (aiData.resolution) specs.push(["Resolution", aiData.resolution]);
    if (aiData.storageType) specs.push(["Storage", aiData.storageType]);
    if (aiData.contractStandard) specs.push(["Standard", aiData.contractStandard]);
  } else {
    if (aiData.recommendedFormat) specs.push(["Format", aiData.recommendedFormat]);
    if (aiData.mintSpeed) specs.push(["Mint speed", aiData.mintSpeed]);
    if (aiData.storageType) specs.push(["Storage", aiData.storageType]);
    if (aiData.traitLayers) specs.push(["Layers", `${aiData.traitLayers} trait layers`]);
  }

  if (elements.aiSpecs) {
    elements.aiSpecs.innerHTML = specs.map(([k, v]) =>
      `<div class="ai-spec-pill"><span>${escapeHtml(k)}</span><strong>${escapeHtml(String(v))}</strong></div>`
    ).join("");
  }

  if (aiData.traits?.length) {
    elements.traitList.innerHTML = aiData.traits.map((t) => `
      <div class="trait-pill">
        <span>${escapeHtml(t.trait_type)}</span>
        <strong>${escapeHtml(t.value)}</strong>
        <em>${escapeHtml(t.rarity)}</em>
      </div>`).join("");
  }

  if (aiData.visualDirection) elements.visualBias.textContent = aiData.visualDirection;
  if (aiData.culturalContext) elements.cultureBias.textContent = aiData.culturalContext;

  setAIStatus("done");
}

// ─── MAIN GENERATE FLOW ───────────────────────────────────────────────────────

async function triggerFullGeneration() {
  const prompt = elements.promptInput.value.trim();
  if (!prompt) return;

  const chain = state.chain;
  const supply = Number(elements.supplyInput.value);
  const format = elements.formatInput.value;
  const optimize = elements.inscriptionToggle.checked && chain === "btc";
  const callKey = `${prompt}|${chain}|${supply}|${format}|${optimize}|${state.nonce}`;
  if (callKey === state.lastAICallKey) return;
  state.lastAICallKey = callKey;

  // Show SVG placeholder immediately
  generateOutput();
  renderOutput();
  showSvgInFrame(state.output.svg, format, state.output.html);

  // Run Claude AI + Stability in parallel where possible
  setAIStatus("loading");
  setImageStatus("loading");

  let imagePrompt = prompt; // fallback if Claude fails

  try {
    // Claude first — it gives us the optimized image prompt
    const aiData = await callClaudeAI(prompt, chain, supply, format, optimize);
    renderAIData(aiData, chain);
    if (aiData.imagePrompt) imagePrompt = aiData.imagePrompt;
  } catch (err) {
    console.warn("Claude AI failed:", err);
    setAIStatus("error");
  }

  // Now generate the actual image with the (potentially AI-enhanced) prompt
  if (state.openaiApiKey) {
    const imageUrl = await generateOpenAIImage(imagePrompt, chain);
    if (imageUrl) showImageInFrame(imageUrl);
    else showSvgInFrame(state.output.svg, format, state.output.html); // fallback to SVG
  } else {
    setImageStatus("no-key");
    // Keep SVG placeholder visible
  }
}

// ─── CORE GENERATE / RENDER ───────────────────────────────────────────────────

function generateOutput() {
  const profile = chainProfiles[state.chain];
  const prompt = elements.promptInput.value.trim() || "Untitled blockchain-native artifact";
  const supply = Number(elements.supplyInput.value);
  const format = elements.formatInput.value;
  const quality = elements.qualityInput.value;
  const optimize = elements.inscriptionToggle.checked && state.chain === "btc";
  const seed = `${elements.seedInput.value.trim() || "chainnative"}-${state.nonce}`;
  const random = seededRandom(hashString(`${seed}-${prompt}-${state.chain}`));
  const traits = buildTraits(profile, random, supply);
  const svg = createSvg({ profile, prompt, traits, variant: 1, format, quality, optimize, seed });
  const html = createHtmlArt(svg, profile);
  const metadata = createMetadata({ profile, prompt, supply, format, quality, optimize, traits, seed });
  const collectionSize = supply === 1 ? 1 : Math.min(12, supply);
  const collection = Array.from({ length: collectionSize }, (_, i) => {
    const vr = seededRandom(hashString(`${seed}-${i}`));
    const vt = buildTraits(profile, vr, supply);
    return { id: i + 1, rarity: supply === 1 ? "1/1" : `${Math.max(1, Math.round(vr() * 100))}%`, svg: createSvg({ profile, prompt, traits: vt, variant: i + 1, format, quality, optimize, seed }) };
  });

  state.output = {
    profile, prompt, supply, format, quality, optimize, traits, svg, html, metadata, collection,
    decisions: profile.decisions({ format, supply, optimize }),
  };
}

function renderOutput() {
  const output = state.output;
  const { profile } = output;
  document.documentElement.style.setProperty("--chain-color", profile.color);
  elements.chainFocus.textContent = profile.label;
  elements.outputTitle.textContent = state.aiData?.aiTitle || profile.title;
  elements.formatBadge.textContent = output.format;
  elements.sizeBadge.textContent = output.optimize ? "~8 KB target" : profile.sizeTarget;
  elements.supplyBadge.textContent = output.supply === 1 ? "single edition" : `${output.supply} item collection`;
  elements.visualBias.textContent = state.aiData?.visualDirection || profile.visualBias;
  elements.technicalBias.textContent = profile.technicalBias;
  elements.metadataBias.textContent = profile.metadataBias;
  elements.cultureBias.textContent = state.aiData?.culturalContext || profile.cultureBias;
  elements.metadataStandard.textContent = profile.metadataStandard;
  elements.raritySummary.textContent = output.supply === 1 ? "single" : "rarity weighted";
  elements.collectionCount.textContent = output.supply === 1 ? "1 generated output" : `${output.collection.length} previewed of ${output.supply}`;

  elements.decisionList.innerHTML = output.decisions.map((d) => `<li>${escapeHtml(d)}</li>`).join("");

  if (!state.aiData?.traits?.length) {
    elements.traitList.innerHTML = output.traits.map((t) => `
      <div class="trait-pill">
        <span>${escapeHtml(t.trait_type)}</span>
        <strong>${escapeHtml(t.value)}</strong>
        <em>${escapeHtml(t.rarity)}</em>
      </div>`).join("");
  }

  elements.collectionGrid.innerHTML = output.collection.map((item) => `
    <article class="mini-output">
      ${item.svg}
      <div><span>#${String(item.id).padStart(3, "0")}</span><span>${item.rarity}</span></div>
    </article>`).join("");

  elements.metadataPreview.textContent = JSON.stringify(output.metadata, null, 2);
}

function selectChain(chain) {
  state.chain = chain;
  state.aiData = null;
  state.lastAICallKey = "";
  document.querySelectorAll(".chain-card").forEach((btn) => {
    const active = btn.dataset.chain === chain;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", String(active));
  });
  elements.inscriptionToggleRow.style.display = chain === "btc" ? "grid" : "none";
  renderFormatOptions();
  generateOutput();
  renderOutput();
  showSvgInFrame(state.output.svg, state.output.format, state.output.html);
  setAIStatus("idle");
  setImageStatus("idle");
}

// ─── DOWNLOAD HELPERS ─────────────────────────────────────────────────────────

function download(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

async function downloadPngFromSvg(filename, svg) {
  const svgUrl = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  const img = new Image();
  img.decoding = "async";
  await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = svgUrl; });
  const canvas = document.createElement("canvas");
  canvas.width = 1400; canvas.height = 1400;
  canvas.getContext("2d").drawImage(img, 0, 0, 1400, 1400);
  URL.revokeObjectURL(svgUrl);
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  }, "image/png", 0.94);
}

function renderFormatOptions() {
  const profile = chainProfiles[state.chain];
  elements.formatInput.innerHTML = profile.formats
    .map((f) => `<option value="${f}" ${f === profile.defaultFormat ? "selected" : ""}>${f}</option>`)
    .join("");
}

// ─── API KEY + MODEL MANAGEMENT ──────────────────────────────────────────────

function initApiKeyUI() {
  if (elements.apiKeyInput) {
    elements.apiKeyInput.value = state.openaiApiKey ? "••••••••••••••••" : "";
    updateApiKeyStatus();
  }
  // Render model selector buttons
  const container = $("modelSelector");
  if (container) {
    container.innerHTML = Object.entries(openAIModels).map(([id, cfg]) => `
      <button
        type="button"
        class="model-btn ${state.selectedModel === id ? "active" : ""}"
        data-model="${id}"
        title="${cfg.description}"
      >
        <strong>${cfg.label}</strong>
        <small>${cfg.description}</small>
      </button>`).join("");

    container.querySelectorAll(".model-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedModel = btn.dataset.model;
        localStorage.setItem("openai_model", state.selectedModel);
        container.querySelectorAll(".model-btn").forEach((b) => b.classList.toggle("active", b === btn));
      });
    });
  }
}

function updateApiKeyStatus() {
  const el = elements.apiKeyStatus;
  if (!el) return;
  if (state.openaiApiKey) {
    el.textContent = "Key saved — real image generation enabled";
    el.dataset.ok = "true";
  } else {
    el.textContent = "No key — generative SVG placeholder will be used";
    el.dataset.ok = "false";
  }
}

// ─── DEBOUNCE ─────────────────────────────────────────────────────────────────

let genDebounce = null;
function scheduleGeneration() {
  clearTimeout(genDebounce);
  genDebounce = setTimeout(() => triggerFullGeneration(), 1000);
}

// ─── EVENT WIRING ─────────────────────────────────────────────────────────────

document.querySelectorAll(".chain-card").forEach((btn) => {
  btn.addEventListener("click", () => selectChain(btn.dataset.chain));
});

[elements.promptInput, elements.supplyInput, elements.formatInput,
 elements.seedInput, elements.qualityInput, elements.inscriptionToggle
].forEach((el) => { el.addEventListener("input", scheduleGeneration); });

elements.generateBtn.addEventListener("click", () => {
  state.nonce += 1;
  state.aiData = null;
  state.lastAICallKey = "";
  triggerFullGeneration();
});

elements.refreshBtn.addEventListener("click", () => {
  state.nonce += 1;
  state.aiData = null;
  state.lastAICallKey = "";
  triggerFullGeneration();
});

elements.downloadArtBtn.addEventListener("click", async () => {
  // If we have a real image, download that
  if (state.currentImageUrl) {
    const a = document.createElement("a");
    a.href = state.currentImageUrl;
    a.download = `${state.chain.toUpperCase()}-chainnative-art.png`;
    a.click();
    return;
  }
  const output = state.output;
  const chain = state.chain.toUpperCase();
  if (output.format === "HTML") { download(`${chain}-chainnative-art.html`, output.html, "text/html"); return; }
  if (output.format === "PNG") { await downloadPngFromSvg(`${chain}-chainnative-art.png`, output.svg); return; }
  download(`${chain}-chainnative-art.svg`, output.svg, "image/svg+xml");
});

elements.downloadMetaBtn.addEventListener("click", () => {
  const chain = state.chain.toUpperCase();
  download(`${chain}-chainnative-metadata.json`, JSON.stringify(state.output.metadata, null, 2), "application/json");
});

if (elements.apiKeySaveBtn) {
  elements.apiKeySaveBtn.addEventListener("click", () => {
    const val = elements.apiKeyInput.value.trim();
    if (val && !val.startsWith("•")) {
      state.openaiApiKey = val;
      localStorage.setItem("openai_api_key", val);
      elements.apiKeyInput.value = "••••••••••••••••";
    }
    updateApiKeyStatus();
  });
}

if (elements.apiKeyInput) {
  elements.apiKeyInput.addEventListener("focus", () => {
    if (elements.apiKeyInput.value.startsWith("•")) elements.apiKeyInput.value = "";
  });
  elements.apiKeyInput.addEventListener("blur", () => {
    if (!elements.apiKeyInput.value && state.stabilityApiKey) elements.apiKeyInput.value = "••••••••••••••••";
  });
}

// ─── INIT ─────────────────────────────────────────────────────────────────────

renderFormatOptions();
generateOutput();
renderOutput();
showSvgInFrame(state.output.svg, state.output.format, state.output.html);
setAIStatus("idle");
setImageStatus(state.openaiApiKey ? "idle" : "no-key");
initApiKeyUI();
