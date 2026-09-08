import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type Row = Record<string, unknown>;

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

async function buildContext(
  supabase: ReturnType<typeof createClient>
) {
  const [destinations, experiences, homestays, heritage, communities] =
    await Promise.all([
      supabase
        .from("destinations")
        .select("name, description, region")
        .limit(10),

      supabase
        .from("experiences")
        .select("title, description, duration, price")
        .limit(10),

      supabase
        .from("homestays")
        .select("family_name, rooms, price")
        .limit(10),

      supabase
        .from("heritage_content")
        .select("title, type, description")
        .limit(10),

      supabase
        .from("communities")
        .select("name, location, culture")
        .limit(10),
    ]);

  return {
    destinations: (destinations.data ?? []) as Row[],
    experiences: (experiences.data ?? []) as Row[],
    homestays: (homestays.data ?? []) as Row[],
    heritage: (heritage.data ?? []) as Row[],
    communities: (communities.data ?? []),
  };
}

function localAssistant(question: string, data: Awaited<ReturnType<typeof buildContext>>) {
  const q = question.toLowerCase();

  const destinations = data.destinations;
  const experiences = data.experiences;
  const homestays = data.homestays;
  const heritage = data.heritage;
  const communities = data.communities;

  // ---------------------------------------------------------
  // DESTINATIONS
  // ---------------------------------------------------------

  if (
    q.includes("destination") ||
    q.includes("places") ||
    q.includes("where") ||
    q.includes("visit") ||
    q.includes("tourist spot")
  ) {
    if (!destinations.length) {
      return "I don't have destination information available yet. Please browse the Destinations page.";
    }

    const names = destinations
      .map((item) => text(item.name))
      .filter(Boolean);

    return `OpenCBT currently has ${names.length} destination${
      names.length === 1 ? "" : "s"
    } in its platform data: ${names.join(", ")}. You can explore the Destinations page for more details.`;
  }

  // ---------------------------------------------------------
  // EXPERIENCES
  // ---------------------------------------------------------

  if (
    q.includes("experience") ||
    q.includes("activity") ||
    q.includes("things to do") ||
    q.includes("what can i do")
  ) {
    if (!experiences.length) {
      return "I don't have experience information available yet. Please browse the Experiences page.";
    }

    const names = experiences
      .map((item) => text(item.title))
      .filter(Boolean);

    return `Available OpenCBT experiences include: ${names.join(
      ", "
    )}. These are designed around community-based and responsible travel.`;
  }

  // ---------------------------------------------------------
  // HOMESTAYS
  // ---------------------------------------------------------

  if (
    q.includes("homestay") ||
    q.includes("stay") ||
    q.includes("accommodation") ||
    q.includes("room")
  ) {
    if (!homestays.length) {
      return "I don't have homestay information available yet. Please browse the Homestays page.";
    }

    const names = homestays
      .map((item) => text(item.family_name))
      .filter(Boolean);

    return `OpenCBT currently lists ${names.length} homestay${
      names.length === 1 ? "" : "s"
    }: ${names.join(", ")}. Check the Homestays page for available room and pricing information.`;
  }

  // ---------------------------------------------------------
  // HERITAGE
  // ---------------------------------------------------------

  if (
    q.includes("heritage") ||
    q.includes("culture") ||
    q.includes("tradition") ||
    q.includes("folk") ||
    q.includes("history")
  ) {
    if (!heritage.length) {
      return "I don't have heritage information available yet. Please browse the Heritage page.";
    }

    const titles = heritage
      .map((item) => text(item.title))
      .filter(Boolean);

    return `OpenCBT's heritage section currently includes: ${titles.join(
      ", "
    )}. The Heritage page has the fuller cultural context.`;
  }

  // ---------------------------------------------------------
  // COMMUNITIES
  // ---------------------------------------------------------

  if (
    q.includes("community") ||
    q.includes("communities") ||
    q.includes("local people") ||
    q.includes("khasia") ||
    q.includes("punji")
  ) {
    if (!communities.length) {
      return "I don't have community information available yet. Please browse the Communities page.";
    }

    const names = communities
      .map((item) => text(item.name))
      .filter(Boolean);

    return `OpenCBT currently features these communities: ${names.join(
      ", "
    )}. The Communities page provides more information about their places, culture, and participation in tourism.`;
  }

  // ---------------------------------------------------------
  // PRICES
  // ---------------------------------------------------------

  if (
    q.includes("price") ||
    q.includes("cost") ||
    q.includes("how much") ||
    q.includes("৳") ||
    q.includes("taka")
  ) {
    const pricedExperiences = experiences
      .map((item) => {
        const title = text(item.title);
        const price = item.price;

        if (!title || price === null || price === undefined || price === "") {
          return null;
        }

        return `${title}: ${String(price)}`;
      })
      .filter(Boolean);

    const pricedHomestays = homestays
      .map((item) => {
        const name = text(item.family_name);
        const price = item.price;

        if (!name || price === null || price === undefined || price === "") {
          return null;
        }

        return `${name}: ${String(price)}`;
      })
      .filter(Boolean);

    const prices = [...pricedExperiences, ...pricedHomestays];

    if (!prices.length) {
      return "I don't have pricing information available yet.";
    }

    return `Current platform pricing information: ${prices.join(
      "; "
    )}. Please check the relevant listing before planning your trip.`;
  }

  // ---------------------------------------------------------
  // GREETING
  // ---------------------------------------------------------

  if (
    q === "hi" ||
    q === "hello" ||
    q === "hey" ||
    q.includes("good morning") ||
    q.includes("good evening")
  ) {
    return "Hi! I'm the OpenCBT Assistant. I can help you explore destinations, experiences, homestays, communities, and heritage in Sylhet.";
  }

  // ---------------------------------------------------------
  // HELP
  // ---------------------------------------------------------

  if (
    q.includes("help") ||
    q.includes("what can you do") ||
    q.includes("what do you know")
  ) {
    return "I can help you explore OpenCBT's destinations, experiences, homestays, communities, heritage information, and available pricing data.";
  }

  // ---------------------------------------------------------
  // LOCATION-SPECIFIC KEYWORDS
  // ---------------------------------------------------------

  const matchedDestination = destinations.find((item) => {
    const name = text(item.name).toLowerCase();
    return name && q.includes(name);
  });

  if (matchedDestination) {
    const name = text(matchedDestination.name);
    const description = text(matchedDestination.description);
    const region = text(matchedDestination.region);

    const details = [
      region ? `Region: ${region}.` : "",
      description || "",
    ]
      .filter(Boolean)
      .join(" ");

    return details
      ? `${name}: ${details}`
      : `${name} is listed as an OpenCBT destination. Please open its destination page for more information.`;
  }

  // ---------------------------------------------------------
  // DEFAULT
  // ---------------------------------------------------------

  return "I can help with OpenCBT destinations, experiences, homestays, communities, heritage, and pricing. Try asking something like “What destinations are available?”";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const question: string = body.question?.trim();

    if (!question) {
      return NextResponse.json(
        {
          error: "question is required",
          code: 400,
        },
        { status: 400 }
      );
    }

    if (question.length > 500) {
      return NextResponse.json(
        {
          error: "question is too long",
          code: 400,
        },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Always build the OpenCBT data context.
    // This allows the assistant to work without an AI API.
    const context = await buildContext(supabase);

    const apiKey = process.env.ANTHROPIC_API_KEY?.trim();

    // =========================================================
    // AI MODE
    // =========================================================

    if (apiKey) {
      const systemPrompt = `You are the OpenCBT travel assistant for a Community Based Tourism platform in Sylhet, Bangladesh.

Answer only using the OpenCBT platform data provided below.

If the answer is not present in the data, say that you don't have that information yet and suggest browsing the relevant OpenCBT page.

Keep answers short, friendly, useful, and specific to community-based and sustainable travel.

Never invent prices, names, availability, locations, or facts.

Platform data:

Destinations:
${JSON.stringify(context.destinations, null, 2)}

Experiences:
${JSON.stringify(context.experiences, null, 2)}

Homestays:
${JSON.stringify(context.homestays, null, 2)}

Heritage:
${JSON.stringify(context.heritage, null, 2)}

Communities:
${JSON.stringify(context.communities, null, 2)}
`;

      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-sonnet-4-6",
            max_tokens: 400,
            system: systemPrompt,
            messages: [
              {
                role: "user",
                content: question,
              },
            ],
          }),
        });

        if (res.ok) {
          const data = await res.json();

          const answer = data.content
            ?.filter(
              (block: { type: string }) => block.type === "text"
            )
            .map((block: { text: string }) => block.text)
            .join("\n")
            .trim();

          if (answer) {
            return NextResponse.json({
              answer,
              mode: "ai",
            });
          }
        }

        // If Anthropic fails, gracefully fall back to local mode.
        console.warn(
          "Anthropic request failed; using local assistant fallback."
        );
      } catch (error) {
        console.warn(
          "Anthropic request failed; using local assistant fallback.",
          error
        );
      }
    }

    // =========================================================
    // LOCAL FALLBACK MODE
    // =========================================================

    const answer = localAssistant(question, context);

    return NextResponse.json({
      answer,
      mode: "local",
    });
  } catch (error) {
    console.error("Assistant error:", error);

    return NextResponse.json(
      {
        error: "Assistant request failed.",
        code: 500,
      },
      { status: 500 }
    );
  }
}
