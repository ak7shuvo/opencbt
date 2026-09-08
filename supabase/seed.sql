-- Local development / demo seed data for the Sylhet pilot.
-- Run once after all migrations (0001–0009). Each block only inserts when
-- its table is still empty, so this is safe to run against a fresh DB and
-- a no-op against one that already has real data.
--
-- `experiences.host_id` is not-null and references `users`, which itself
-- references `auth.users`. To seed browsable sample experiences without
-- requiring a real sign-up first, we seed one demo auth user (only in an
-- empty auth.users table, i.e. a fresh local/demo project) and use it as
-- the host for all sample experiences below.
insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data
)
select
  '00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-00000000d3d0',
  'authenticated', 'authenticated', 'demo-host@opencbt.example', crypt('demo-password', gen_salt('bf')),
  now(), now(), now(),
  '{"provider":"email","providers":["email"]}', '{"full_name":"OpenCBT Demo Host","role":"community"}'
where not exists (select 1 from auth.users)
on conflict (id) do nothing;

insert into experiences (community_id, title, description, duration, price, host_id)
select c.id, e.title, e.description, e.duration, e.price, u.id
from (values
  ('Khasia Punji Betel Leaf Growers', 'Khasi Village Visit', 'A guided walk through a working Khasia punji — betel leaf vines climbing living trees, a stop at the community hall, and tea with a host family.', '3 hours', 700),
  ('Khasia Punji Betel Leaf Growers', 'Jadoh Cooking with a Khasia Family', 'Cook jadoh — Khasia rice and pork cooked in turmeric stock — with a punji host family, traditionally prepared for community gatherings.', '2.5 hours', 600),
  ('Jaflong Stone Collectors'' Cooperative', 'Riverside Stone Collecting Walk', 'See how families sort stones washed down from the Khasi Hills, and learn how the cooperative shares tourism income among member households.', '2 hours', 450),
  ('Lakkatura Tea Garden Village', 'Tea Garden Walk', 'Walk the terraced rows of Lakkatura tea estate with a resident guide, ending with a factory floor visit and a fresh-cut cup.', '2 hours', 500),
  ('Lakkatura Tea Garden Village', 'Traditional Cooking Session', 'Cook Sylheti shatkora beef and jhumur-song favourites alongside a tea garden host family, then share the meal together.', '3 hours', 800),
  ('Lakkatura Tea Garden Village', 'Folk Music Evening', 'An evening of jhumur songs brought by tea-labourer ancestors from Chotanagpur, performed live with a chance to join in.', '1.5 hours', 400),
  ('Ratargul Boatmen''s Community', 'River Cruise', 'A country-boat trip through the flooded trees of Ratargul swamp forest, poled by a local boatman who knows the seasonal channels by heart.', '2.5 hours', 600),
  ('Ratargul Boatmen''s Community', 'Ratargul Birding by Boat', 'An early-morning boat trip through Ratargul focused on resident and migratory birdlife, guided by a local boatman.', '2 hours', 650),
  ('Manipuri Weavers'' Circle', 'Manipuri Weaving Demonstration', 'Watch a phanek being woven on a hand loom and try a few passes of the shuttle yourself, hosted by a Manipuri weaving family.', '1.5 hours', 550),
  ('Patro Betel Vine Families', 'Betel Vine Farm Walk', 'Walk a Patro family''s betel vine and areca garden along the Jaflong hill road, and learn how leaves are picked, sorted, and bundled.', '1.5 hours', 400),
  ('Garo Hillside Growers', 'Garo Drumming & Dance Session', 'A short introduction to Wangala harvest-festival drumming and dance, hosted by a Garo hillside family in Bishwanath.', '1 hour', 350),
  ('Sreemangal Tea & Lemon Growers', 'Seven-Layer Tea & Orchard Walk', 'Learn how Sreemangal''s famous seven-layer tea is layered by hand, then walk the family''s lemon and pineapple orchard.', '2 hours', 500)
) as x(community_name, title, description, duration, price)
join communities c on c.name = x.community_name
join auth.users u on u.email = 'demo-host@opencbt.example'
where not exists (select 1 from experiences);

-- Additional pilot-area destinations (Jaflong, Khasia Punji, Rena, and the
-- tea garden belt are already seeded by 0004/0008).
insert into destinations (name, slug, description, region, lat, lng) values
  ('Lalakhal', 'lalakhal', 'A canal of turquoise water running into the Sari river, framed by hills on the India border — best reached by boat from Sarighat.', 'Sylhet', 25.1339, 92.0264),
  ('Bisnakandi', 'bisnakandi', 'A stone quarry and waterfall spot at the foot of the Khasi Hills, where boulders wash down from Meghalaya into shallow, clear channels.', 'Sylhet', 25.1467, 92.0119),
  ('Ratargul Swamp Forest', 'ratargul-swamp-forest', 'One of the few freshwater swamp forests in Bangladesh — half the year the trees stand waist-deep in water, explored by small country boats.', 'Sylhet', 25.0136, 91.9614),
  ('Sreemangal', 'sreemangal', 'The tea capital of Bangladesh — rolling tea estates, pineapple and lemon orchards, and the country''s best-known seven-layer tea.', 'Moulvibazar', 24.3065, 91.7296),
  ('Lawachara National Park', 'lawachara', 'A rainforest national park near Sreemangal, home to the endangered western hoolock gibbon and Khasia and Tripura settlements within the forest.', 'Moulvibazar', 24.3253, 91.7830),
  ('Madhabkunda', 'madhabkunda', 'The tallest waterfall in Bangladesh, dropping through forest at the edge of the Patharia Hills, with a small Khasia punji nearby.', 'Moulvibazar', 24.5333, 92.1167),
  ('Tanguar Haor', 'tanguar-haor', 'A vast wetland ecosystem near the Meghalaya border — a Ramsar site of open water and swamp forest that turns into a single inland sea during monsoon.', 'Sunamganj', 25.1167, 91.1167),
  ('Hakaluki Haor', 'hakaluki-haor', 'The largest freshwater wetland in Bangladesh, an important wintering site for migratory birds and a source of fishing livelihoods for surrounding villages.', 'Moulvibazar', 24.7333, 92.0333),
  ('Nijhum Dwip', 'nijhum-dwip', 'A quiet island in the Bay of Bengal known for spotted deer, migratory birds, and fishing villages — reached by boat from Noakhali.', 'Noakhali', 22.0500, 91.0333)
on conflict (slug) do nothing;

-- Communities
insert into communities (name, location, history, culture, verified)
select * from (values
  (
    'Khasia Punji Betel Leaf Growers',
    'Khasia Punji, Jaflong',
    'The Khasia have lived in punji (hill settlements) around Jaflong for generations, growing betel leaf on the hill slopes under areca and jackfruit trees. Land in a punji is managed collectively under a headman (mantri), a system that has shaped how the community still makes decisions today.',
    'Betel leaf (paan) cultivation is both a livelihood and a craft passed down through families — vines are trained up living trees rather than poles, and picking, sorting, and bundling leaves for market is done largely by women. Visitors are welcomed into working punji with advance notice through the community profile.',
    true
  ),
  (
    'Jaflong Stone Collectors'' Cooperative',
    'Jaflong riverside, Sylhet',
    'For decades, families along the Piyain river have earned a living gathering stones washed down from the Khasi Hills — work that shaped the riverside economy long before Jaflong became a tourist destination. The cooperative formed to give stone-worker families a stake in the tourism income now generated on the same riverbank.',
    'A guided riverside walk shows how stones are collected, sorted, and loaded — physically demanding, low-paid work that most visitors never see up close. The cooperative uses a share of homestay and guiding income to fund school fees for members'' children.',
    true
  ),
  (
    'Lakkatura Tea Garden Village',
    'Sylhet Tea Garden Belt',
    'Lakkatura is one of the older tea estates ringing Sylhet city, its workforce descended from labourers brought from central and eastern India during the colonial tea trade. Many families have worked the same gardens for three or four generations.',
    'Daily life follows the tea calendar: plucking season, factory processing, and the Bengali and Sylheti festivals — plus community-specific ones like Karam Puja — that punctuate the year. A homestay stay here usually includes a factory walk-through and a plucking demonstration on the terraced slopes.',
    false
  ),
  (
    'Ratargul Boatmen''s Community',
    'Gowainghat, near Ratargul Swamp Forest',
    'Families in the villages bordering Ratargul have poled boats through the flooded forest for as long as anyone can remember, first for fishing and firewood, more recently for the growing number of visitors who come to see the submerged trees.',
    'Boatmen here read water levels and channels that shift with the season, knowledge that has no substitute for a safe visit. The community is working with local NGOs on a rotation system so boat income is shared rather than concentrated among a few families.',
    false
  ),
  (
    'Manipuri Weavers'' Circle',
    'Kalapur, Sylhet',
    'Manipuri families settled in Sylhet generations ago, bringing a distinct textile and dance tradition that has stayed largely within the community until recent years.',
    'Hand-loom weaving of the Manipuri sarong (phanek) and the classical Ras Leela dance are still taught to children at home, and are now shared with visiting guests on request.',
    true
  ),
  (
    'Patro Betel Vine Families',
    'Zaflong Road, Gowainghat',
    'Patro families have farmed betel vine and areca gardens along the hill roads near Jaflong for generations, working land that sits between Khasia punji and lowland Bengali villages.',
    'A distinct dialect and set of harvest customs mark Patro identity, kept alive through family gatherings and now shared through short guided farm walks.',
    false
  ),
  (
    'Garo Hillside Growers',
    'Bishwanath, Sylhet',
    'A small Garo community farming the forested hills of northern Sylhet, following a matrilineal clan system uncommon elsewhere in the region.',
    'Wangala, the post-harvest thanksgiving festival, remains the community''s central cultural event, marked with drumming and dance that guests can attend during the November harvest season.',
    false
  ),
  (
    'Sreemangal Tea & Lemon Growers',
    'Sreemangal, Moulvibazar',
    'Smallholder families around Sreemangal grow tea, lemon, and pineapple on the same hillsides, a mixed-farming pattern distinct from the large single-crop estates nearby.',
    'Seven-layer tea (a Sreemangal specialty) and lemon orchard walks are shared with visitors as a way of showing farming life beyond the big tea gardens.',
    false
  )
) as v(name, location, history, culture, verified)
where not exists (select 1 from communities);

-- Homestays
insert into homestays (community_id, family_name, rooms, price, availability)
select c.id, h.family_name, h.rooms, h.price, h.availability::jsonb
from (values
  ('Khasia Punji Betel Leaf Growers', 'Nongrum Family Homestay', 2, 1200, '{"note": "shared bathroom, meals included"}'),
  ('Khasia Punji Betel Leaf Growers', 'Wahlang Family Homestay', 1, 900, '{"note": "single room, meals on request"}'),
  ('Jaflong Stone Collectors'' Cooperative', 'Riverside Miah Homestay', 3, 1000, '{"note": "riverside view, breakfast included"}'),
  ('Lakkatura Tea Garden Village', 'Tea Estate Bungalow Room', 2, 1500, '{"note": "attached bathroom, garden view"}'),
  ('Ratargul Boatmen''s Community', 'Haor-side Family Homestay', 2, 800, '{"note": "boat pickup available on request"}'),
  ('Manipuri Weavers'' Circle', 'Manipuri Loom House Homestay', 2, 1100, '{"note": "meals and a weaving demonstration included"}'),
  ('Garo Hillside Growers', 'Garo Hillside Homestay', 1, 850, '{"note": "single room, home-cooked meals included"}'),
  ('Sreemangal Tea & Lemon Growers', 'Orchard View Homestay', 3, 1300, '{"note": "lemon orchard on site, breakfast included"}')
) as h(community_name, family_name, rooms, price, availability)
join communities c on c.name = h.community_name
where not exists (select 1 from homestays);

-- Heritage archive entries
insert into heritage_content (community_id, type, title, description)
select c.id, e.type::heritage_type, e.title, e.description
from (values
  ('Khasia Punji Betel Leaf Growers', 'story', 'Why the Betel Vine Climbs the Jackfruit Tree', 'A punji folk story explaining why betel vines are traditionally trained up living jackfruit and areca trees rather than dead poles — tying the plant''s wellbeing to the health of the forest around it.'),
  ('Khasia Punji Betel Leaf Growers', 'food', 'Jadoh, Khasia Rice and Pork', 'A staple Khasia dish of rice cooked in pork stock with turmeric and local herbs, traditionally prepared for community gatherings and now offered to visiting guests as part of a homestay meal.'),
  ('Khasia Punji Betel Leaf Growers', 'festival', 'Nongkrem-Style Harvest Thanksgiving', 'A smaller, punji-level adaptation of the Khasi harvest thanksgiving tradition, marked with communal food, music, and a blessing for the coming betel leaf season.'),
  ('Jaflong Stone Collectors'' Cooperative', 'craft', 'Riverbed Stone Sorting', 'The practiced eye and hand needed to sort stones by size and quality straight from the riverbed — a skill demonstrated on cooperative-led riverside walks.'),
  ('Jaflong Stone Collectors'' Cooperative', 'story', 'The River That Feeds and Takes', 'An oral history among stone-worker families about the Piyain river''s seasonal floods — how the same water that carries down stone for their livelihood has also taken lives, and the caution that shapes daily work on the banks.'),
  ('Lakkatura Tea Garden Village', 'music', 'Jhumur Songs of the Tea Gardens', 'Work and festival songs brought by tea-labourer ancestors from Chotanagpur, still sung at community celebrations and increasingly shared with visitors during evening homestay gatherings.'),
  ('Lakkatura Tea Garden Village', 'food', 'Sylheti Shatkora Beef', 'A tangy beef curry made with shatkora, a citrus fruit distinctive to the Sylhet region, often served to guests as an introduction to local flavor.'),
  ('Ratargul Boatmen''s Community', 'story', 'Reading the Flooded Forest', 'Passed-down knowledge of which channels through Ratargul stay navigable as water levels drop through the dry season, and which trees mark a safe route for a boatman new to the forest.'),
  ('Ratargul Boatmen''s Community', 'craft', 'Handmade Country Boats', 'The construction of the narrow wooden boats used to navigate the swamp forest, built and repaired locally using techniques suited to shallow, obstacle-filled water.'),
  ('Manipuri Weavers'' Circle', 'craft', 'Phanek Hand-Loom Weaving', 'The Manipuri sarong (phanek) is still woven by hand on family looms, with patterns and colors that mark clan and occasion.')
) as e(community_name, type, title, description)
join communities c on c.name = e.community_name
where not exists (select 1 from heritage_content);

-- Impact metrics (two reporting years per community)
insert into impact_metrics (community_id, year, income, employment, women_participation, youth_participation)
select c.id, m.year, m.income, m.employment, m.women_participation, m.youth_participation
from (values
  ('Khasia Punji Betel Leaf Growers', 2024, 480000, 14, 9, 4),
  ('Khasia Punji Betel Leaf Growers', 2025, 610000, 17, 11, 5),
  ('Jaflong Stone Collectors'' Cooperative', 2024, 350000, 22, 6, 8),
  ('Jaflong Stone Collectors'' Cooperative', 2025, 415000, 25, 7, 9),
  ('Lakkatura Tea Garden Village', 2024, 290000, 11, 8, 3),
  ('Lakkatura Tea Garden Village', 2025, 330000, 13, 9, 4),
  ('Ratargul Boatmen''s Community', 2024, 210000, 9, 2, 5),
  ('Ratargul Boatmen''s Community', 2025, 265000, 12, 3, 6)
) as m(community_name, year, income, employment, women_participation, youth_participation)
join communities c on c.name = m.community_name
where not exists (select 1 from impact_metrics);
