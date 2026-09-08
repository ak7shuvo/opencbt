// Local starter content — used ONLY as a fallback when a Supabase table
// is unreachable or still empty, so the app is browsable immediately
// after extraction without any setup. Real data from Supabase always
// takes priority; these arrays are never written to the database.
//
// IDs are fixed strings (not real UUIDs) so detail-page links
// (/communities/[id], /homestays/[id], etc.) resolve consistently.
import {
  Community,
  Destination,
  Experience,
  Homestay,
  HeritageContent,
  ImpactMetric,
} from "./types";

export const FALLBACK_COMMUNITIES: Community[] = [
  {
    id: "fallback-community-khasia",
    name: "Khasia Punji Betel Leaf Growers",
    location: "Khasia Punji, Jaflong",
    history:
      "The Khasia have lived in punji (hill settlements) around Jaflong for generations, growing betel leaf on the hill slopes under areca and jackfruit trees. Land in a punji is managed collectively under a headman (mantri), a system that still shapes community decisions today.",
    culture:
      "Betel leaf (paan) cultivation is both a livelihood and a craft passed down through families — vines are trained up living trees rather than poles. Visitors are welcomed into working punji with advance notice.",
    contact_info: null,
    verified: true,
    created_by: null,
    created_at: "2026-01-05T00:00:00.000Z",
  },
  {
    id: "fallback-community-manipuri",
    name: "Manipuri Weavers' Circle",
    location: "Kalapur, Sylhet",
    history:
      "Manipuri families settled in Sylhet generations ago, bringing a distinct textile and dance tradition that has stayed largely within the community until recent years.",
    culture:
      "Hand-loom weaving of the Manipuri sarong (phanek) and the classical Ras Leela dance are still taught to children at home and at the community hall, and are now shared with visiting guests on request.",
    contact_info: null,
    verified: true,
    created_by: null,
    created_at: "2026-01-06T00:00:00.000Z",
  },
  {
    id: "fallback-community-tea-worker",
    name: "Lakkatura Tea Garden Village",
    location: "Sylhet Tea Garden Belt",
    history:
      "Lakkatura is one of the older tea estates ringing Sylhet city, its workforce descended from labourers brought from central and eastern India during the colonial tea trade.",
    culture:
      "Daily life follows the tea calendar — plucking season, factory processing, and festivals like Karam Puja. A homestay stay usually includes a factory walk-through and a plucking demonstration.",
    contact_info: null,
    verified: false,
    created_by: null,
    created_at: "2026-01-07T00:00:00.000Z",
  },
  {
    id: "fallback-community-patro",
    name: "Patro Betel Vine Families",
    location: "Zaflong Road, Gowainghat",
    history:
      "Patro families have farmed betel vine and areca gardens along the hill roads near Jaflong for generations, working land that sits between Khasia punji and lowland Bengali villages.",
    culture:
      "A distinct dialect and set of harvest customs mark Patro identity, kept alive through family gatherings and now shared through short guided farm walks.",
    contact_info: null,
    verified: false,
    created_by: null,
    created_at: "2026-01-08T00:00:00.000Z",
  },
  {
    id: "fallback-community-garo",
    name: "Garo Hillside Growers",
    location: "Bishwanath, Sylhet",
    history:
      "A small Garo community farming the forested hills of northern Sylhet, following a matrilineal clan system uncommon elsewhere in the region.",
    culture:
      "Wangala, the post-harvest thanksgiving festival, remains the community's central cultural event, marked with drumming and dance that guests can attend during the November harvest season.",
    contact_info: null,
    verified: false,
    created_by: null,
    created_at: "2026-01-09T00:00:00.000Z",
  },
  {
    id: "fallback-community-jaflong-stone",
    name: "Jaflong Stone Collectors' Cooperative",
    location: "Jaflong riverside, Sylhet",
    history:
      "For decades, families along the Piyain river have earned a living gathering stones washed down from the Khasi Hills. The cooperative formed to give stone-worker families a stake in the tourism income now generated on the same riverbank.",
    culture:
      "A guided riverside walk shows how stones are collected, sorted, and loaded. The cooperative uses a share of homestay and guiding income to fund school fees for members' children.",
    contact_info: null,
    verified: true,
    created_by: null,
    created_at: "2026-01-10T00:00:00.000Z",
  },
  {
    id: "fallback-community-ratargul-boatmen",
    name: "Ratargul Boatmen's Community",
    location: "Gowainghat, near Ratargul Swamp Forest",
    history:
      "Families in the villages bordering Ratargul have poled boats through the flooded forest for generations, first for fishing and firewood, more recently for the growing number of visitors.",
    culture:
      "Boatmen here read water levels and channels that shift with the season. The community is working with local NGOs on a rotation system so boat income is shared rather than concentrated among a few families.",
    contact_info: null,
    verified: false,
    created_by: null,
    created_at: "2026-01-11T00:00:00.000Z",
  },
  {
    id: "fallback-community-sreemangal-tea",
    name: "Sreemangal Tea & Lemon Growers",
    location: "Sreemangal, Moulvibazar",
    history:
      "Smallholder families around Sreemangal grow tea, lemon, and pineapple on the same hillsides, a mixed-farming pattern distinct from the large single-crop estates nearby.",
    culture:
      "Seven-layer tea (a Sreemangal specialty) and lemon orchard walks are shared with visitors as a way of showing farming life beyond the big tea gardens.",
    contact_info: null,
    verified: false,
    created_by: null,
    created_at: "2026-01-12T00:00:00.000Z",
  },
];

export const FALLBACK_DESTINATIONS: Destination[] = [
  {
    id: "fallback-dest-jaflong",
    name: "Jaflong",
    slug: "jaflong",
    description:
      "River landscape, stone-collection livelihoods, and nature tourism along the India border, where the Piyain river runs down from the Khasi Hills.",
    region: "Sylhet",
    gallery: null,
    lat: 25.1728,
    lng: 92.0170,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-dest-khasia-punji",
    name: "Khasia Punji",
    slug: "khasia-punji",
    description:
      "Indigenous Khasia community: betel leaf cultivation, heritage knowledge, and punji village life on the hill slopes above Jaflong.",
    region: "Sylhet",
    gallery: null,
    lat: 25.1590,
    lng: 91.9930,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "fallback-dest-lalakhal",
    name: "Lalakhal",
    slug: "lalakhal",
    description:
      "A canal of turquoise water running into the Sari river, framed by hills on the India border — best reached by boat from Sarighat.",
    region: "Sylhet",
    gallery: null,
    lat: 25.1339,
    lng: 92.0264,
    created_at: "2026-01-02T00:00:00.000Z",
  },
  {
    id: "fallback-dest-bisnakandi",
    name: "Bisnakandi",
    slug: "bisnakandi",
    description:
      "A stone quarry and waterfall spot at the foot of the Khasi Hills, where boulders wash down from Meghalaya into shallow, clear channels.",
    region: "Sylhet",
    gallery: null,
    lat: 25.1467,
    lng: 92.0119,
    created_at: "2026-01-02T00:00:00.000Z",
  },
  {
    id: "fallback-dest-ratargul",
    name: "Ratargul Swamp Forest",
    slug: "ratargul-swamp-forest",
    description:
      "One of the few freshwater swamp forests in Bangladesh — half the year the trees stand waist-deep in water, explored by small country boats.",
    region: "Sylhet",
    gallery: null,
    lat: 25.0136,
    lng: 91.9614,
    created_at: "2026-01-02T00:00:00.000Z",
  },
  {
    id: "fallback-dest-sreemangal",
    name: "Sreemangal",
    slug: "sreemangal",
    description:
      "The tea capital of Bangladesh — rolling tea estates, pineapple and lemon orchards, and the country's best-known seven-layer tea.",
    region: "Moulvibazar",
    gallery: null,
    lat: 24.3065,
    lng: 91.7296,
    created_at: "2026-01-03T00:00:00.000Z",
  },
  {
    id: "fallback-dest-lawachara",
    name: "Lawachara National Park",
    slug: "lawachara",
    description:
      "A rainforest national park near Sreemangal, home to the endangered western hoolock gibbon and Khasia and Tripura settlements within the forest.",
    region: "Moulvibazar",
    gallery: null,
    lat: 24.3253,
    lng: 91.7830,
    created_at: "2026-01-03T00:00:00.000Z",
  },
  {
    id: "fallback-dest-madhabkunda",
    name: "Madhabkunda",
    slug: "madhabkunda",
    description:
      "The tallest waterfall in Bangladesh, dropping through forest at the edge of the Patharia Hills, with a small Khasia punji nearby.",
    region: "Moulvibazar",
    gallery: null,
    lat: 24.5333,
    lng: 92.1167,
    created_at: "2026-01-03T00:00:00.000Z",
  },
  {
    id: "fallback-dest-tanguar-haor",
    name: "Tanguar Haor",
    slug: "tanguar-haor",
    description:
      "A vast wetland ecosystem near the Meghalaya border — a Ramsar site of open water and swamp forest that turns into a single inland sea during monsoon.",
    region: "Sunamganj",
    gallery: null,
    lat: 25.1167,
    lng: 91.1167,
    created_at: "2026-01-04T00:00:00.000Z",
  },
  {
    id: "fallback-dest-hakaluki-haor",
    name: "Hakaluki Haor",
    slug: "hakaluki-haor",
    description:
      "The largest freshwater wetland in Bangladesh, an important wintering site for migratory birds and a source of fishing livelihoods for surrounding villages.",
    region: "Moulvibazar",
    gallery: null,
    lat: 24.7333,
    lng: 92.0333,
    created_at: "2026-01-04T00:00:00.000Z",
  },
  {
    id: "fallback-dest-nijhum-dwip",
    name: "Nijhum Dwip",
    slug: "nijhum-dwip",
    description:
      "A quiet island in the Bay of Bengal known for spotted deer, migratory birds, and fishing villages — reached by boat from Noakhali.",
    region: "Noakhali",
    gallery: null,
    lat: 22.0500,
    lng: 91.0333,
    created_at: "2026-01-05T00:00:00.000Z",
  },
  {
    id: "fallback-dest-tea-belt",
    name: "Sylhet Tea Garden Belt",
    slug: "tea-garden-belt",
    description:
      "Rolling tea estates, rural villages, and traditional Sylheti food ringing Sylhet city — home to some of the country's oldest tea gardens.",
    region: "Sylhet",
    gallery: null,
    lat: 24.9400,
    lng: 91.8800,
    created_at: "2026-01-01T00:00:00.000Z",
  },
];

export const FALLBACK_HOMESTAYS: Homestay[] = [
  {
    id: "fallback-homestay-nongrum",
    community_id: "fallback-community-khasia",
    family_name: "Nongrum Family Homestay, Khasia Punji",
    rooms: 2,
    price: 1200,
    availability: {
      note: "Shared bathroom, meals included. Sleeps up to 4 guests.",
      sustainability: "Rainwater harvesting; betel-leaf farm walk included at no extra cost.",
    },
    created_at: "2026-01-06T00:00:00.000Z",
  },
  {
    id: "fallback-homestay-wahlang",
    community_id: "fallback-community-khasia",
    family_name: "Wahlang Family Homestay, Khasia Punji",
    rooms: 1,
    price: 900,
    availability: {
      note: "Single room, meals on request. Sleeps up to 2 guests.",
      sustainability: "Solar water heating; food sourced from the family's own garden.",
    },
    created_at: "2026-01-06T00:00:00.000Z",
  },
  {
    id: "fallback-homestay-riverside-miah",
    community_id: "fallback-community-jaflong-stone",
    family_name: "Riverside Miah Homestay, Jaflong",
    rooms: 3,
    price: 1000,
    availability: {
      note: "Riverside view, breakfast included. Sleeps up to 6 guests.",
      sustainability: "Income shared across the stone collectors' cooperative fund.",
    },
    created_at: "2026-01-07T00:00:00.000Z",
  },
  {
    id: "fallback-homestay-tea-bungalow",
    community_id: "fallback-community-tea-worker",
    family_name: "Tea Estate Bungalow Room, Lakkatura",
    rooms: 2,
    price: 1500,
    availability: {
      note: "Attached bathroom, garden view. Sleeps up to 4 guests.",
      sustainability: "Guests join the morning plucking round with no added fee.",
    },
    created_at: "2026-01-08T00:00:00.000Z",
  },
  {
    id: "fallback-homestay-haor-side",
    community_id: "fallback-community-ratargul-boatmen",
    family_name: "Haor-side Family Homestay, Ratargul",
    rooms: 2,
    price: 800,
    availability: {
      note: "Boat pickup available on request. Sleeps up to 4 guests.",
      sustainability: "Boat trips run on a community rotation so income is shared fairly.",
    },
    created_at: "2026-01-09T00:00:00.000Z",
  },
  {
    id: "fallback-homestay-manipuri-loom",
    community_id: "fallback-community-manipuri",
    family_name: "Manipuri Loom House Homestay, Kalapur",
    rooms: 2,
    price: 1100,
    availability: {
      note: "Meals and a short weaving demonstration included. Sleeps up to 4 guests.",
      sustainability: "Natural dyes only; loom offcuts reused for guest gifts.",
    },
    created_at: "2026-01-10T00:00:00.000Z",
  },
  {
    id: "fallback-homestay-garo-hillside",
    community_id: "fallback-community-garo",
    family_name: "Garo Hillside Homestay, Bishwanath",
    rooms: 1,
    price: 850,
    availability: {
      note: "Single room, home-cooked meals included. Sleeps up to 3 guests.",
      sustainability: "Firewood use limited to fallen wood only, by community agreement.",
    },
    created_at: "2026-01-11T00:00:00.000Z",
  },
  {
    id: "fallback-homestay-sreemangal-orchard",
    community_id: "fallback-community-sreemangal-tea",
    family_name: "Orchard View Homestay, Sreemangal",
    rooms: 3,
    price: 1300,
    availability: {
      note: "Lemon orchard on site, breakfast included. Sleeps up to 6 guests.",
      sustainability: "Composted orchard waste; no chemical pesticides on the property.",
    },
    created_at: "2026-01-12T00:00:00.000Z",
  },
];

export const FALLBACK_EXPERIENCES: Experience[] = [
  {
    id: "fallback-exp-tea-walk",
    community_id: "fallback-community-tea-worker",
    title: "Tea Garden Walk",
    description:
      "Walk the terraced rows of Lakkatura tea estate with a resident guide, ending with a factory floor visit and a fresh-cut cup.",
    duration: "2 hours",
    price: 500,
    host_id: "fallback-host",
    created_at: "2026-01-08T00:00:00.000Z",
  },
  {
    id: "fallback-exp-khasi-village",
    community_id: "fallback-community-khasia",
    title: "Khasi Village Visit",
    description:
      "A guided walk through a working Khasia punji — betel leaf vines climbing living trees, a stop at the community hall, and tea with a host family.",
    duration: "3 hours",
    price: 700,
    host_id: "fallback-host",
    created_at: "2026-01-06T00:00:00.000Z",
  },
  {
    id: "fallback-exp-river-cruise",
    community_id: "fallback-community-ratargul-boatmen",
    title: "Ratargul River Cruise",
    description:
      "A country-boat trip through the flooded trees of Ratargul swamp forest, poled by a local boatman who knows the seasonal channels by heart.",
    duration: "2.5 hours",
    price: 600,
    host_id: "fallback-host",
    created_at: "2026-01-09T00:00:00.000Z",
  },
  {
    id: "fallback-exp-cooking",
    community_id: "fallback-community-tea-worker",
    title: "Traditional Cooking Session",
    description:
      "Cook Sylheti shatkora beef and jhumur-song favourites alongside a tea garden host family, then share the meal together.",
    duration: "3 hours",
    price: 800,
    host_id: "fallback-host",
    created_at: "2026-01-08T00:00:00.000Z",
  },
  {
    id: "fallback-exp-folk-music",
    community_id: "fallback-community-tea-worker",
    title: "Folk Music Evening",
    description:
      "An evening of jhumur songs brought by tea-labourer ancestors from Chotanagpur, performed live with a chance to join in.",
    duration: "1.5 hours",
    price: 400,
    host_id: "fallback-host",
    created_at: "2026-01-08T00:00:00.000Z",
  },
  {
    id: "fallback-exp-stone-collecting",
    community_id: "fallback-community-jaflong-stone",
    title: "Riverside Stone Collecting Walk",
    description:
      "See how families sort stones washed down from the Khasi Hills, and learn how the cooperative shares tourism income among member households.",
    duration: "2 hours",
    price: 450,
    host_id: "fallback-host",
    created_at: "2026-01-10T00:00:00.000Z",
  },
  {
    id: "fallback-exp-manipuri-weaving",
    community_id: "fallback-community-manipuri",
    title: "Manipuri Weaving Demonstration",
    description:
      "Watch a phanek being woven on a hand loom and try a few passes of the shuttle yourself, hosted by a Manipuri weaving family.",
    duration: "1.5 hours",
    price: 550,
    host_id: "fallback-host",
    created_at: "2026-01-10T00:00:00.000Z",
  },
  {
    id: "fallback-exp-betel-farm",
    community_id: "fallback-community-patro",
    title: "Betel Vine Farm Walk",
    description:
      "Walk a Patro family's betel vine and areca garden along the Jaflong hill road, and learn how leaves are picked, sorted, and bundled.",
    duration: "1.5 hours",
    price: 400,
    host_id: "fallback-host",
    created_at: "2026-01-11T00:00:00.000Z",
  },
  {
    id: "fallback-exp-wangala",
    community_id: "fallback-community-garo",
    title: "Garo Drumming & Dance Session",
    description:
      "A short introduction to Wangala harvest-festival drumming and dance, hosted by a Garo hillside family in Bishwanath.",
    duration: "1 hour",
    price: 350,
    host_id: "fallback-host",
    created_at: "2026-01-12T00:00:00.000Z",
  },
  {
    id: "fallback-exp-seven-layer-tea",
    community_id: "fallback-community-sreemangal-tea",
    title: "Seven-Layer Tea & Orchard Walk",
    description:
      "Learn how Sreemangal's famous seven-layer tea is layered by hand, then walk the family's lemon and pineapple orchard.",
    duration: "2 hours",
    price: 500,
    host_id: "fallback-host",
    created_at: "2026-01-13T00:00:00.000Z",
  },
  {
    id: "fallback-exp-swamp-birding",
    community_id: "fallback-community-ratargul-boatmen",
    title: "Ratargul Birding by Boat",
    description:
      "An early-morning boat trip through Ratargul focused on resident and migratory birdlife, guided by a local boatman.",
    duration: "2 hours",
    price: 650,
    host_id: "fallback-host",
    created_at: "2026-01-09T00:00:00.000Z",
  },
  {
    id: "fallback-exp-jadoh-cooking",
    community_id: "fallback-community-khasia",
    title: "Jadoh Cooking with a Khasia Family",
    description:
      "Cook jadoh — Khasia rice and pork cooked in turmeric stock — with a punji host family, traditionally prepared for community gatherings.",
    duration: "2.5 hours",
    price: 600,
    host_id: "fallback-host",
    created_at: "2026-01-06T00:00:00.000Z",
  },
];

export const FALLBACK_HERITAGE: HeritageContent[] = [
  {
    id: "fallback-heritage-betel-story",
    community_id: "fallback-community-khasia",
    type: "story",
    title: "Why the Betel Vine Climbs the Jackfruit Tree",
    description:
      "A punji folk story explaining why betel vines are traditionally trained up living jackfruit and areca trees rather than dead poles — tying the plant's wellbeing to the health of the forest around it.",
    media_url: null,
    created_at: "2026-01-06T00:00:00.000Z",
  },
  {
    id: "fallback-heritage-jadoh",
    community_id: "fallback-community-khasia",
    type: "food",
    title: "Jadoh, Khasia Rice and Pork",
    description:
      "A staple Khasia dish of rice cooked in pork stock with turmeric and local herbs, traditionally prepared for community gatherings and now offered to visiting guests as part of a homestay meal.",
    media_url: null,
    created_at: "2026-01-06T00:00:00.000Z",
  },
  {
    id: "fallback-heritage-stone-sorting",
    community_id: "fallback-community-jaflong-stone",
    type: "craft",
    title: "Riverbed Stone Sorting",
    description:
      "The practiced eye and hand needed to sort stones by size and quality straight from the riverbed — a skill demonstrated on cooperative-led riverside walks.",
    media_url: null,
    created_at: "2026-01-10T00:00:00.000Z",
  },
  {
    id: "fallback-heritage-jhumur",
    community_id: "fallback-community-tea-worker",
    type: "music",
    title: "Jhumur Songs of the Tea Gardens",
    description:
      "Work and festival songs brought by tea-labourer ancestors from Chotanagpur, still sung at community celebrations and increasingly shared with visitors during evening homestay gatherings.",
    media_url: null,
    created_at: "2026-01-08T00:00:00.000Z",
  },
  {
    id: "fallback-heritage-shatkora",
    community_id: "fallback-community-tea-worker",
    type: "food",
    title: "Sylheti Shatkora Beef",
    description:
      "A tangy beef curry made with shatkora, a citrus fruit distinctive to the Sylhet region, often served to guests as an introduction to local flavor.",
    media_url: null,
    created_at: "2026-01-08T00:00:00.000Z",
  },
  {
    id: "fallback-heritage-flooded-forest",
    community_id: "fallback-community-ratargul-boatmen",
    type: "story",
    title: "Reading the Flooded Forest",
    description:
      "Passed-down knowledge of which channels through Ratargul stay navigable as water levels drop through the dry season, and which trees mark a safe route for a boatman new to the forest.",
    media_url: null,
    created_at: "2026-01-09T00:00:00.000Z",
  },
  {
    id: "fallback-heritage-country-boats",
    community_id: "fallback-community-ratargul-boatmen",
    type: "craft",
    title: "Handmade Country Boats",
    description:
      "The construction of the narrow wooden boats used to navigate the swamp forest, built and repaired locally using techniques suited to shallow, obstacle-filled water.",
    media_url: null,
    created_at: "2026-01-09T00:00:00.000Z",
  },
  {
    id: "fallback-heritage-ras-leela",
    community_id: "fallback-community-manipuri",
    type: "festival",
    title: "Ras Leela",
    description:
      "A classical Manipuri dance-drama performed at festival gatherings, passed down through years of home and community-hall training, now occasionally opened to visiting guests.",
    media_url: null,
    created_at: "2026-01-10T00:00:00.000Z",
  },
  {
    id: "fallback-heritage-phanek-weaving",
    community_id: "fallback-community-manipuri",
    type: "craft",
    title: "Phanek Hand-Loom Weaving",
    description:
      "The Manipuri sarong (phanek) is still woven by hand on family looms, with patterns and colors that mark clan and occasion.",
    media_url: null,
    created_at: "2026-01-10T00:00:00.000Z",
  },
  {
    id: "fallback-heritage-wangala-festival",
    community_id: "fallback-community-garo",
    type: "festival",
    title: "Wangala Harvest Thanksgiving",
    description:
      "The Garo community's post-harvest thanksgiving, marked with drumming, dance, and shared food, held each November on the Bishwanath hillsides.",
    media_url: null,
    created_at: "2026-01-11T00:00:00.000Z",
  },
];

export const FALLBACK_IMPACT: ImpactMetric[] = [
  {
    id: "fallback-impact-khasia-2024",
    community_id: "fallback-community-khasia",
    year: 2024,
    income: 480000,
    employment: 14,
    women_participation: 9,
    youth_participation: 4,
    created_at: "2026-01-06T00:00:00.000Z",
  },
  {
    id: "fallback-impact-khasia-2025",
    community_id: "fallback-community-khasia",
    year: 2025,
    income: 610000,
    employment: 17,
    women_participation: 11,
    youth_participation: 5,
    created_at: "2026-01-06T00:00:00.000Z",
  },
  {
    id: "fallback-impact-stone-2024",
    community_id: "fallback-community-jaflong-stone",
    year: 2024,
    income: 350000,
    employment: 22,
    women_participation: 6,
    youth_participation: 8,
    created_at: "2026-01-10T00:00:00.000Z",
  },
  {
    id: "fallback-impact-stone-2025",
    community_id: "fallback-community-jaflong-stone",
    year: 2025,
    income: 415000,
    employment: 25,
    women_participation: 7,
    youth_participation: 9,
    created_at: "2026-01-10T00:00:00.000Z",
  },
  {
    id: "fallback-impact-tea-2024",
    community_id: "fallback-community-tea-worker",
    year: 2024,
    income: 290000,
    employment: 11,
    women_participation: 8,
    youth_participation: 3,
    created_at: "2026-01-08T00:00:00.000Z",
  },
  {
    id: "fallback-impact-tea-2025",
    community_id: "fallback-community-tea-worker",
    year: 2025,
    income: 330000,
    employment: 13,
    women_participation: 9,
    youth_participation: 4,
    created_at: "2026-01-08T00:00:00.000Z",
  },
  {
    id: "fallback-impact-boatmen-2024",
    community_id: "fallback-community-ratargul-boatmen",
    year: 2024,
    income: 210000,
    employment: 9,
    women_participation: 2,
    youth_participation: 5,
    created_at: "2026-01-09T00:00:00.000Z",
  },
  {
    id: "fallback-impact-boatmen-2025",
    community_id: "fallback-community-ratargul-boatmen",
    year: 2025,
    income: 265000,
    employment: 12,
    women_participation: 3,
    youth_participation: 6,
    created_at: "2026-01-09T00:00:00.000Z",
  },
];
