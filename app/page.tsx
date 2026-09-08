import Link from "next/link";

const destinations = [
  {
    number: "01",
    title: "Explore places with a story",
    description:
      "Discover landscapes, villages, rivers and green corners of Sylhet where the journey is shaped by the people who live there.",
    href: "/destinations",
  },
  {
    number: "02",
    title: "Experience local life",
    description:
      "Move beyond sightseeing. Meet communities, learn traditions and take part in experiences rooted in everyday life.",
    href: "/experiences",
  },
  {
    number: "03",
    title: "Stay closer to home",
    description:
      "Choose homestays that let travellers experience hospitality locally while creating value for the community.",
    href: "/homestays",
  },
];

const principles = [
  {
    number: "01",
    title: "Community first",
    text: "Tourism should create opportunity for the people who call a destination home.",
  },
  {
    number: "02",
    title: "Living heritage",
    text: "Culture is not an exhibit. It is something people continue to live, practise and pass forward.",
  },
  {
    number: "03",
    title: "Meaningful travel",
    text: "The best journeys leave you with more than photographs — they leave understanding.",
  },
  {
    number: "04",
    title: "Responsible by nature",
    text: "Travel gently, respect place and culture, and leave something good behind.",
  },
];

export default function Home() {
  return (
    <>

      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="section-bleed relative isolate overflow-hidden border-b border-forest/10 bg-sand">
        <div
          className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[32rem] w-[32rem] rounded-full bg-forest/5 blur-3xl animate-float"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -bottom-40 -left-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-forest/5 blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
          aria-hidden="true"
        />

        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28 lg:py-32">
          <div className="grid items-center gap-16 lg:grid-cols-[1.12fr_0.88fr] lg:gap-20">

            {/* Hero copy */}
            <div className="max-w-3xl">
              <div className="mb-7 flex items-center gap-3 animate-fade-up">
                <span className="h-px w-10 bg-forest/40" />
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-forest/70">
                  Community · Culture · Nature
                </span>
              </div>

              <h1
                className="font-display text-5xl leading-[0.96] tracking-tight text-forest sm:text-6xl lg:text-[5.25rem] animate-fade-up"
                style={{ animationDelay: "100ms" }}
              >
                Some places are not
                <br />
                meant to be
                <span className="italic text-forest/60">
                  {" "}
                  simply visited.
                </span>
              </h1>

              <div
                className="mt-8 max-w-2xl space-y-5 text-base leading-8 text-ink/65 sm:text-lg animate-fade-up-soft"
                style={{ animationDelay: "200ms" }}
              >
                <p>
                  They are meant to be listened to, walked through, and
                  remembered.
                </p>

                <p>
                  In Sylhet, a journey can begin beside a quiet river,
                  continue through green hills and village paths, and end with
                  a story shared by someone who calls this place home.
                </p>

                <p>
                  <strong className="font-medium text-ink/85">
                    OpenCBT connects travellers with those stories
                  </strong>{" "}
                  — with local communities, living heritage, meaningful
                  experiences, and places that deserve to be discovered
                  gently.
                </p>
              </div>

              <div
                className="mt-9 flex flex-wrap gap-4 animate-fade-up"
                style={{ animationDelay: "300ms" }}
              >
                <Link
                  href="/destinations"
                  className="group relative overflow-hidden rounded-sm bg-forest px-6 py-3.5 text-sm font-medium text-sand shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:translate-y-0"
                >
                  <span className="relative z-10">
                    Explore Sylhet
                    <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>

                  <span
                    className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-full"
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  href="/experiences"
                  className="group rounded-sm border border-forest/20 px-6 py-3.5 text-sm text-ink/75 transition-all duration-300 hover:-translate-y-1 hover:border-forest/40 hover:bg-forest/5 hover:text-forest"
                >
                  Discover experiences
                  <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </Link>
              </div>

              <div
                className="mt-9 flex items-center gap-3 text-xs italic text-ink/45 animate-fade-up-soft"
                style={{ animationDelay: "400ms" }}
              >
                <span className="h-px w-7 bg-ink/20" />
                Travel gently. Stay locally. Leave something good behind.
              </div>
            </div>

            {/* Hero visual */}
            <div
              className="relative min-h-[430px] animate-fade-up-soft"
              style={{ animationDelay: "250ms" }}
            >
              <div className="absolute inset-x-5 top-4 bottom-12 overflow-hidden rounded-sm border border-forest/10 bg-forest/[0.07] shadow-xl">

                <div className="absolute inset-0 bg-gradient-to-br from-forest/15 via-transparent to-forest/5" />

                <div className="absolute left-8 top-8 h-28 w-28 rounded-full border border-forest/15" />
                <div className="absolute right-10 top-16 h-16 w-16 rounded-full border border-forest/10" />

                <div
                  className="absolute bottom-0 left-0 h-56 w-full bg-forest/10"
                  style={{
                    clipPath:
                      "polygon(0 66%, 12% 49%, 24% 57%, 39% 30%, 53% 51%, 68% 25%, 84% 47%, 100% 30%, 100% 100%, 0 100%)",
                  }}
                />

                <div
                  className="absolute bottom-0 left-0 h-36 w-full bg-forest/15"
                  style={{
                    clipPath:
                      "polygon(0 70%, 19% 51%, 37% 68%, 55% 43%, 72% 61%, 88% 39%, 100% 54%, 100% 100%, 0 100%)",
                  }}
                />

                <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
                  <div className="max-w-sm">
                    <p className="font-display text-3xl leading-tight text-forest sm:text-4xl">
                      “A journey becomes
                      <br />
                      meaningful when
                      <br />
                      <span className="italic text-forest/55">
                        the place remembers you.
                      </span>
                      ”
                    </p>

                    <div className="mx-auto mt-7 h-px w-10 bg-forest/30" />

                    <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-forest/50">
                      Sylhet · Bangladesh
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-1 left-0 rounded-sm border border-forest/10 bg-sand/95 px-5 py-4 shadow-lg backdrop-blur-md animate-float">
                <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40">
                  The OpenCBT idea
                </p>
                <p className="mt-1 font-display text-lg text-forest">
                  Travel with the community.
                </p>
              </div>

              <div className="absolute right-0 top-0 rounded-full border border-forest/15 bg-sand/90 px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-forest shadow-sm backdrop-blur-md animate-pulse-soft">
                Local · Responsible · Human
              </div>
            </div>
          </div>

          {/* Hero principles */}
          <div
            className="mt-20 grid grid-cols-2 border-t border-forest/10 pt-8 sm:grid-cols-4 animate-fade-up"
            style={{ animationDelay: "500ms" }}
          >
            {[
              "Community first",
              "Living heritage",
              "Local experiences",
              "Responsible travel",
            ].map((item, index) => (
              <div
                key={item}
                className={`px-4 ${
                  index < 3 ? "border-r border-forest/10" : ""
                } ${index === 0 ? "pl-0" : ""}`}
              >
                <p className="font-display text-2xl text-forest">
                  0{index + 1}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-ink/45">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================== */}
      <section className="section-bleed bg-forest text-sand">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-sand/50">
                Why OpenCBT
              </p>
            </div>

            <div>
              <h2 className="max-w-4xl font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
                Tourism can be more than seeing a place.
                <span className="italic text-sand/55">
                  {" "}
                  It can become a way of knowing it.
                </span>
              </h2>

              <p className="mt-7 max-w-2xl text-sm leading-7 text-sand/65 sm:text-base">
                OpenCBT is a community-based tourism platform built around
                Sylhet's people, places, culture and everyday stories. It aims
                to bring travellers and communities closer — creating journeys
                that are more personal, respectful and locally meaningful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          EXPLORE CARDS
      ========================================================== */}
      <section className="section-bleed bg-sand">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:py-28">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-forest/50">
                Start your journey
              </p>

              <h2 className="mt-3 font-display text-4xl text-forest sm:text-5xl">
                Find your way into Sylhet.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-ink/50">
              From landscapes to local life, discover the different ways a
              destination can be experienced.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-forest/10 bg-forest/10 md:grid-cols-3">
            {destinations.map((item, index) => (
              <Link
                key={item.number}
                href={item.href}
                className="group relative bg-sand p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-[#eee7d8]"
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-3xl text-forest/25">
                    {item.number}
                  </span>

                  <span className="text-forest/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </div>

                <h3 className="mt-16 font-display text-2xl text-forest">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-ink/55">
                  {item.description}
                </p>

                <div className="mt-7 h-px w-8 bg-forest/25 transition-all duration-500 group-hover:w-16" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          HERITAGE
      ========================================================== */}
      <section className="section-bleed border-y border-forest/10 bg-[#eee7d8]">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

            <div className="relative min-h-[360px] overflow-hidden border border-forest/10 bg-sand/60">
              <div className="absolute inset-0 bg-gradient-to-br from-forest/10 via-transparent to-forest/5" />

              <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-forest/10" />

              <div className="absolute bottom-0 left-0 h-40 w-full bg-forest/10 [clip-path:polygon(0_65%,20%_48%,35%_60%,50%_35%,68%_57%,82%_42%,100%_55%,100%_100%,0_100%)]" />

              <div className="absolute inset-0 flex items-center justify-center text-center">
                <div>
                  <p className="font-display text-4xl text-forest">
                    Living
                    <br />
                    <span className="italic text-forest/55">heritage.</span>
                  </p>

                  <p className="mt-5 text-[10px] uppercase tracking-[0.25em] text-forest/45">
                    Stories · Skills · Traditions
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-forest/50">
                Heritage & Culture
              </p>

              <h2 className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl">
                A culture survives
                <br />
                when it is <span className="italic">lived.</span>
              </h2>

              <p className="mt-7 max-w-xl text-sm leading-7 text-ink/60 sm:text-base">
                Sylhet's heritage lives in its songs, food, crafts, stories,
                landscapes and everyday practices. OpenCBT gives travellers a
                way to encounter these traditions with context and respect —
                not simply as something to photograph, but as something to
                understand.
              </p>

              <Link
                href="/heritage"
                className="group mt-8 inline-flex items-center gap-2 text-sm text-forest"
              >
                Explore living heritage
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          COMMUNITY
      ========================================================== */}
      <section className="section-bleed bg-sand">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-forest/50">
              The people behind the place
            </p>

            <h2 className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl">
              The destination is not only the landscape.
              <span className="italic text-forest/55">
                {" "}
                It is the people.
              </span>
            </h2>

            <p className="mt-6 text-sm leading-7 text-ink/55 sm:text-base">
              Community-based tourism begins with listening. Explore the
              communities, families and local knowledge that give a destination
              its character.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Link
              href="/communities"
              className="group relative min-h-[260px] overflow-hidden border border-forest/10 bg-forest p-8 text-sand transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-sand/10 transition-transform duration-700 group-hover:scale-125" />

              <div className="relative flex h-full flex-col justify-between">
                <span className="text-[10px] uppercase tracking-[0.25em] text-sand/45">
                  Communities
                </span>

                <div>
                  <h3 className="font-display text-3xl">
                    Meet the people
                    <br />
                    behind the journey.
                  </h3>

                  <span className="mt-6 inline-block text-sm text-sand/65 transition-transform duration-300 group-hover:translate-x-1">
                    Explore communities →
                  </span>
                </div>
              </div>
            </Link>

            <Link
              href="/homestays"
              className="group relative min-h-[260px] overflow-hidden border border-forest/10 bg-[#eee7d8] p-8 text-forest transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative flex h-full flex-col justify-between">
                <span className="text-[10px] uppercase tracking-[0.25em] text-forest/45">
                  Homestays
                </span>

                <div>
                  <h3 className="font-display text-3xl">
                    Stay somewhere
                    <br />
                    that feels like home.
                  </h3>

                  <span className="mt-6 inline-block text-sm text-forest/60 transition-transform duration-300 group-hover:translate-x-1">
                    Discover homestays →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          PRINCIPLES
      ========================================================== */}
      <section className="section-bleed border-y border-forest/10 bg-forest text-sand">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-sand/45">
                Our approach
              </p>

              <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
                A different
                <br />
                way to <span className="italic text-sand/55">travel.</span>
              </h2>
            </div>

            <div className="grid gap-px overflow-hidden border border-sand/10 bg-sand/10 sm:grid-cols-2">
              {principles.map((item) => (
                <div
                  key={item.number}
                  className="bg-forest p-7 transition-colors duration-300 hover:bg-sand/5"
                >
                  <span className="text-xs text-sand/30">
                    {item.number}
                  </span>

                  <h3 className="mt-10 font-display text-2xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-sand/55">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          IMPACT
      ========================================================== */}
      <section className="section-bleed bg-sand">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:py-28">
          <div className="grid items-end gap-12 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-forest/50">
                Beyond the journey
              </p>

              <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-forest sm:text-5xl">
                When travel creates value locally,
                <span className="italic text-forest/55">
                  {" "}
                  everyone travels further.
                </span>
              </h2>
            </div>

            <Link
              href="/impact"
              className="group whitespace-nowrap text-sm text-forest"
            >
              See our impact
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-2 border-y border-forest/10 sm:grid-cols-4">
            {[
              ["01", "Local income"],
              ["02", "Cultural respect"],
              ["03", "Community voice"],
              ["04", "Better journeys"],
            ].map(([number, label], index) => (
              <div
                key={number}
                className={`px-5 py-8 ${
                  index < 3 ? "border-r border-forest/10" : ""
                } ${index === 0 ? "pl-0" : ""}`}
              >
                <p className="font-display text-3xl text-forest">
                  {number}
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-ink/45">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================== */}
      <section className="section-bleed relative overflow-hidden bg-[#eee7d8]">
        <div
          className="pointer-events-none absolute -right-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full border border-forest/10"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -right-20 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full border border-forest/10"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
          <p className="text-[10px] uppercase tracking-[0.3em] text-forest/45">
            Your next story starts here
          </p>

          <h2 className="mx-auto mt-5 max-w-4xl font-display text-4xl leading-tight text-forest sm:text-5xl lg:text-6xl">
            Come for the landscape.
            <br />
            <span className="italic text-forest/55">
              Leave with a story.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-ink/55 sm:text-base">
            Discover Sylhet through its places, people, experiences and
            heritage — and make your journey part of something bigger.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/destinations"
              className="group rounded-sm bg-forest px-7 py-3.5 text-sm font-medium text-sand shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Begin exploring
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/search"
              className="rounded-sm border border-forest/20 px-7 py-3.5 text-sm text-forest transition-all duration-300 hover:-translate-y-1 hover:border-forest/40 hover:bg-forest/5"
            >
              Search OpenCBT
            </Link>
          </div>

          <p className="mt-12 font-display text-lg italic text-forest/35">
            “Travel gently. Stay locally. Leave something good behind.”
          </p>
        </div>
      </section>

    </>
  );
}
