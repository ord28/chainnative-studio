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

const state = {
  chain: "btc",
  nonce: 0,
  output: null,
};

const $ = (id) => document.getElementById(id);

const elements = {
  chainFocus: $("chainFocus"),
  promptInput: $("promptInput"),
  supplyInput: $("supplyInput"),
  formatInput: $("formatInput"),
  seedInput: $("seedInput"),
  qualityInput: $("qualityInput"),
  imageKeyInput: $("imageKeyInput"),
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
};

function hashString(input) {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let next = value;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(items, random) {
  return items[Math.floor(random() * items.length) % items.length];
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (char) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return entities[char];
  });
}

function promptKeywords(prompt) {
  return prompt
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 3)
    .slice(0, 8);
}

function buildTraits(profile, random, supply) {
  return Object.entries(profile.traits).map(([trait_type, values]) => {
    const rarity = supply > 1 ? Math.max(1, Math.round(random() * 100)) : 100;
    return {
      trait_type,
      value: pick(values, random),
      rarity: supply > 1 ? `${rarity}%` : "edition trait",
    };
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

  for (let index = 0; index < shapeCount; index += 1) {
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

  const traitText = traits.map((trait) => `${trait.trait_type}: ${trait.value}`).join(" | ");
  const glow = profile.label.startsWith("ETH") ? `<filter id="glow"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>` : "";
  const btcMotion = format === "GIF" || format === "HTML" ? `<animateTransform attributeName="transform" type="rotate" from="0 500 500" to="4 500 500" dur="6s" repeatCount="indefinite" additive="sum"/>` : "";
  const solLayer = profile.label.startsWith("SOL") ? `<g opacity=".9"><rect x="260" y="230" width="480" height="540" rx="40" fill="${paper}"/><rect x="310" y="300" width="380" height="340" rx="28" fill="${base}"/><circle cx="500" cy="410" r="92" fill="${primary}"/><path d="M390 565c70-95 150-95 220 0v105H390z" fill="${secondary}"/></g>` : "";
  const ethLayer = profile.label.startsWith("ETH") ? `<g filter="url(#glow)"><path d="M500 180c115 80 178 178 178 300 0 168-81 270-178 344-97-74-178-176-178-344 0-122 63-220 178-300z" fill="${paper}" opacity=".95"/><path d="M500 260l115 220-115 72-115-72z" fill="${primary}"/><path d="M500 570l115-70-115 178-115-178z" fill="${secondary}"/></g>` : "";
  const btcLayer = profile.label.startsWith("BTC") ? `<g><rect x="302" y="238" width="396" height="524" fill="none" stroke="${paper}" stroke-width="${compact ? 10 : 18}"/><path d="M395 320h150c78 0 126 34 126 92 0 42-22 69-62 83 50 13 78 46 78 95 0 70-55 110-140 110H395z" fill="${primary}"/><path d="M455 382h80c36 0 58 15 58 43s-22 43-58 43h-80zm0 150h95c40 0 65 17 65 50s-25 50-65 50h-95z" fill="${base}"/></g>` : "";

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" role="img" aria-label="${title}">
  <defs>
    ${glow}
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop stop-color="${base}"/>
      <stop offset="1" stop-color="${profile.dark}"/>
    </linearGradient>
    <pattern id="grid" width="${compact ? 80 : 46}" height="${compact ? 80 : 46}" patternUnits="userSpaceOnUse">
      <path d="M0 .5H${compact ? 80 : 46}M.5 0V${compact ? 80 : 46}" stroke="${paper}" stroke-opacity=".12"/>
    </pattern>
  </defs>
  <rect width="1000" height="1000" fill="url(#bg)"/>
  <rect width="1000" height="1000" fill="url(#grid)"/>
  <g opacity=".95">
    ${lines.join("")}
    ${btcMotion}
  </g>
  ${btcLayer}
  ${ethLayer}
  ${solLayer}
  <path d="M120 828c170-70 322-70 456 0s232 70 304 0" fill="none" stroke="${signal}" stroke-width="${compact ? 8 : 16}" opacity=".8"/>
  <text x="64" y="90" fill="${paper}" font-family="monospace" font-size="${compact ? 28 : 34}" font-weight="800">${chain} / ${escapeHtml(format)}</text>
  <text x="64" y="940" fill="${paper}" font-family="monospace" font-size="${compact ? 20 : 25}" opacity=".82">${escapeHtml(traitText.slice(0, 92))}</text>
</svg>`.trim();
}

function createHtmlArt(svg, profile) {
  return `
<!doctype html>
<html><head><meta charset="UTF-8"><style>
html,body{margin:0;height:100%;background:${profile.dark};display:grid;place-items:center}
svg{width:min(100vmin,1000px);height:auto}
@keyframes drift{50%{filter:hue-rotate(18deg) saturate(1.2)}}
body{animation:drift 5s infinite}
</style></head><body>${svg}</body></html>`.trim();
}

function createAiPrompt({ profile, prompt, supply, format, quality, optimize, traits }) {
  const traitLanguage = traits.map((trait) => `${trait.trait_type}: ${trait.value}`).join(", ");
  const shared = [
    prompt,
    "original AI generated artwork",
    "no logo, no watermark, no text, no frame",
    "square composition, high visual impact",
    `selected output format: ${format}`,
    `quality mode: ${quality}`,
    `traits: ${traitLanguage}`,
  ];

  if (profile.label.startsWith("BTC")) {
    shared.push(
      "Bitcoin Ordinals culture",
      "experimental collector artifact",
      "scarcity driven conceptual art",
      optimize
        ? "minimal but beautiful, inscription efficient, crisp vector-like shapes, limited palette"
        : "experimental on-chain art aesthetic, luminous details, self-contained digital artifact",
    );
  } else if (profile.label.startsWith("ETH")) {
    shared.push(
      "Ethereum NFT culture",
      "premium marketplace-ready art",
      "cinematic lighting, polished rendering, rich details, collectible 1 of 1 gallery quality",
    );
  } else {
    shared.push(
      "Solana NFT culture",
      "clean vibrant generative collection style",
      "bold readable silhouette, modern PFP energy, fast-moving community drop aesthetic",
    );
  }

  if (supply > 1) {
    shared.push("consistent collection style, rarity traits visible through costume, color, and background variation");
  }

  return shared.join(", ");
}

function createAiImageUrl(aiPrompt, seed, size = 1024, key = "") {
  const params = new URLSearchParams({
    width: String(size),
    height: String(size),
    seed: String(hashString(seed)),
    nologo: "true",
    enhance: "true",
    model: "zimage",
  });
  if (key) params.set("key", key);
  return `https://gen.pollinations.ai/image/${encodeURIComponent(aiPrompt)}?${params.toString()}`;
}

function stripKeyFromUrl(url) {
  const cleanUrl = new URL(url);
  cleanUrl.searchParams.delete("key");
  return cleanUrl.toString();
}

function createMetadata({ profile, prompt, supply, format, quality, optimize, traits, seed, aiPrompt, aiImageUrl }) {
  const publicImageUrl = stripKeyFromUrl(aiImageUrl);
  const base = {
    name: `${profile.label} - ${promptKeywords(prompt).slice(0, 3).join(" ") || "ChainNative"} #001`,
    description: `${profile.label} adaptive artwork generated from: "${prompt}".`,
    chain_profile: profile.label,
    output_format: format,
    supply,
    generation_seed: seed,
    ai_image_prompt: aiPrompt,
    image: publicImageUrl,
    attributes: traits.map(({ trait_type, value }) => ({ trait_type, value })),
  };

  if (profile.label.startsWith("BTC")) {
    return {
      ...base,
      inscription: {
        artifact: optimize ? "byte-optimized self-contained artifact" : "high-quality self-contained artifact",
        recommended_content_type: format === "HTML" ? "text/html" : format === "SVG" ? "image/svg+xml" : `image/${format.toLowerCase()}`,
        compression_mode: optimize ? "low-size" : quality,
      },
    };
  }

  if (profile.label.startsWith("ETH")) {
    return {
      ...base,
      image: publicImageUrl,
      animation_url: format === "HTML" || format === "GIF" ? "ipfs://<generated-animation-cid>" : undefined,
      external_url: "https://chainnative.example/eth/drop",
      marketplace: {
        standard: "ERC-721",
        display_type: "OpenSea compatible",
        collection_strategy: supply > 1 ? "rarity-weighted collection" : "1/1 gallery piece",
      },
    };
  }

  return {
    ...base,
    image: publicImageUrl,
    properties: {
      files: [{ uri: publicImageUrl, type: `image/${format.toLowerCase()}` }],
      category: "image",
      creators: [{ address: "<creator-wallet>", share: 100 }],
    },
    collection: {
      name: "ChainNative SOL Drop",
      family: "ChainNative",
      strategy: supply > 1 ? "layered batch mint" : "single drop-ready edition",
    },
  };
}

function generateOutput() {
  const profile = chainProfiles[state.chain];
  const prompt = elements.promptInput.value.trim() || "Untitled blockchain-native artifact";
  const supply = Number(elements.supplyInput.value);
  const format = elements.formatInput.value;
  const quality = elements.qualityInput.value;
  const optimize = elements.inscriptionToggle.checked && state.chain === "btc";
  const seed = `${elements.seedInput.value.trim() || "chainnative"}-${state.nonce}`;
  const imageKey = elements.imageKeyInput.value.trim();
  const random = seededRandom(hashString(`${seed}-${prompt}-${state.chain}`));
  const traits = buildTraits(profile, random, supply);
  const svg = createSvg({ profile, prompt, traits, variant: 1, format, quality, optimize, seed });
  const html = createHtmlArt(svg, profile);
  const aiPrompt = createAiPrompt({ profile, prompt, supply, format, quality, optimize, traits });
  const aiImageUrl = createAiImageUrl(aiPrompt, `${seed}-${state.chain}-primary`, 1024, imageKey);
  const metadata = createMetadata({
    profile,
    prompt,
    supply,
    format,
    quality,
    optimize,
    traits,
    seed,
    aiPrompt,
    aiImageUrl,
  });
  const collectionSize = supply === 1 ? 1 : Math.min(12, supply);
  const collection = Array.from({ length: collectionSize }, (_, index) => {
    const variantRandom = seededRandom(hashString(`${seed}-${index}`));
    const variantTraits = buildTraits(profile, variantRandom, supply);
    const variantPrompt = createAiPrompt({ profile, prompt, supply, format, quality, optimize, traits: variantTraits });
    return {
      id: index + 1,
      rarity: supply === 1 ? "1/1" : `${Math.max(1, Math.round(variantRandom() * 100))}%`,
      imageUrl: createAiImageUrl(variantPrompt, `${seed}-${state.chain}-${index + 1}`, 640, imageKey),
      svg: createSvg({
        profile,
        prompt,
        traits: variantTraits,
        variant: index + 1,
        format,
        quality,
        optimize,
        seed,
      }),
    };
  });

  state.output = {
    profile,
    prompt,
    supply,
    format,
    quality,
    optimize,
    traits,
    svg,
    html,
    aiPrompt,
    aiImageUrl,
    metadata,
    collection,
    decisions: profile.decisions({ format, supply, optimize }),
  };
}

function renderFormatOptions() {
  const profile = chainProfiles[state.chain];
  elements.formatInput.innerHTML = profile.formats
    .map((format) => `<option value="${format}" ${format === profile.defaultFormat ? "selected" : ""}>${format}</option>`)
    .join("");
}

function renderOutput() {
  const output = state.output;
  const { profile } = output;
  document.documentElement.style.setProperty("--chain-color", profile.color);
  elements.chainFocus.textContent = profile.label;
  elements.outputTitle.textContent = profile.title;
  elements.formatBadge.textContent = output.format;
  elements.sizeBadge.textContent = output.optimize ? "~8 KB target" : profile.sizeTarget;
  elements.supplyBadge.textContent = output.supply === 1 ? "single edition" : `${output.supply} item collection`;
  elements.visualBias.textContent = profile.visualBias;
  elements.technicalBias.textContent = profile.technicalBias;
  elements.metadataBias.textContent = profile.metadataBias;
  elements.cultureBias.textContent = profile.cultureBias;
  elements.metadataStandard.textContent = profile.metadataStandard;
  elements.raritySummary.textContent = output.supply === 1 ? "single" : "rarity weighted";
  elements.collectionCount.textContent = output.supply === 1 ? "1 generated output" : `${output.collection.length} previewed of ${output.supply}`;

  const shouldUseAiImage = !(state.chain === "btc" && output.optimize && (output.format === "SVG" || output.format === "HTML"));

  if (shouldUseAiImage) {
    elements.artFrame.innerHTML = `
      <img class="ai-art" src="${output.aiImageUrl}" alt="${escapeHtml(output.prompt)}" />
      <div class="fallback-art" aria-hidden="true">${output.svg}</div>
    `;
    const image = elements.artFrame.querySelector(".ai-art");
    image.addEventListener("error", () => {
      elements.artFrame.classList.add("show-fallback");
    });
    image.addEventListener("load", () => {
      elements.artFrame.classList.remove("show-fallback");
    });
  } else if (output.format === "HTML") {
    elements.artFrame.innerHTML = `<iframe title="Generated HTML art preview"></iframe>`;
    elements.artFrame.querySelector("iframe").srcdoc = output.html;
  } else {
    elements.artFrame.innerHTML = output.svg;
  }

  elements.decisionList.innerHTML = output.decisions.map((decision) => `<li>${escapeHtml(decision)}</li>`).join("");
  elements.traitList.innerHTML = output.traits
    .map(
      (trait) => `
        <div class="trait-pill">
          <span>${escapeHtml(trait.trait_type)}</span>
          <strong>${escapeHtml(trait.value)}</strong>
          <em>${escapeHtml(trait.rarity)}</em>
        </div>`,
    )
    .join("");
  elements.collectionGrid.innerHTML = output.collection
    .map(
      (item) => `
      <article class="mini-output">
        ${shouldUseAiImage ? `<img src="${item.imageUrl}" alt="Collection output ${item.id}" loading="lazy" />` : item.svg}
        <div><span>#${String(item.id).padStart(3, "0")}</span><span>${item.rarity}</span></div>
      </article>`,
    )
    .join("");
  elements.metadataPreview.textContent = JSON.stringify(output.metadata, null, 2);
}

function selectChain(chain) {
  state.chain = chain;
  document.querySelectorAll(".chain-card").forEach((button) => {
    const isActive = button.dataset.chain === chain;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  elements.inscriptionToggleRow.style.display = chain === "btc" ? "grid" : "none";
  renderFormatOptions();
  generateOutput();
  renderOutput();
}

function download(filename, content, type) {
  const blob = new Blob([content], { type });
  downloadBlob(filename, blob);
}

function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function downloadPngFromSvg(filename, svg) {
  const svgUrl = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  const image = new Image();
  image.decoding = "async";
  const loaded = new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });
  image.src = svgUrl;
  await loaded;
  const canvas = document.createElement("canvas");
  canvas.width = 1400;
  canvas.height = 1400;
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  URL.revokeObjectURL(svgUrl);
  canvas.toBlob((blob) => downloadBlob(filename, blob), "image/png", 0.94);
}

document.querySelectorAll(".chain-card").forEach((button) => {
  button.addEventListener("click", () => selectChain(button.dataset.chain));
});

[
  elements.promptInput,
  elements.supplyInput,
  elements.formatInput,
  elements.seedInput,
  elements.qualityInput,
  elements.inscriptionToggle,
  elements.imageKeyInput,
].forEach((control) => {
  control.addEventListener("input", () => {
    if (control === elements.imageKeyInput) {
      localStorage.setItem("chainnative-image-key", elements.imageKeyInput.value.trim());
    }
    generateOutput();
    renderOutput();
  });
});

elements.generateBtn.addEventListener("click", () => {
  state.nonce += 1;
  generateOutput();
  renderOutput();
});

elements.refreshBtn.addEventListener("click", () => {
  state.nonce += 1;
  generateOutput();
  renderOutput();
});

elements.downloadArtBtn.addEventListener("click", async () => {
  const output = state.output;
  const chain = state.chain.toUpperCase();
  if (output.format === "HTML") {
    download(`${chain}-chainnative-art.html`, output.html, "text/html");
    return;
  }
  if (output.format === "PNG") {
    if (output.aiImageUrl) {
      window.open(output.aiImageUrl, "_blank", "noopener");
      return;
    }
    await downloadPngFromSvg(`${chain}-chainnative-art.png`, output.svg);
    return;
  }
  if (output.format === "GIF") {
    download(`${chain}-chainnative-loop.svg`, output.svg, "image/svg+xml");
    return;
  }
  download(`${chain}-chainnative-art.svg`, output.svg, "image/svg+xml");
});

elements.downloadMetaBtn.addEventListener("click", () => {
  const chain = state.chain.toUpperCase();
  download(`${chain}-chainnative-metadata.json`, JSON.stringify(state.output.metadata, null, 2), "application/json");
});

elements.imageKeyInput.value = localStorage.getItem("chainnative-image-key") || "";
renderFormatOptions();
generateOutput();
renderOutput();
