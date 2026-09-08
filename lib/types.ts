export type Community = {
  id: string;
  name: string;
  location: string;
  history: string | null;
  culture: string | null;
  contact_info: Record<string, unknown> | null;
  verified: boolean;
  created_by: string | null;
  created_at: string;
};

export type Destination = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  region: string | null;
  gallery: Record<string, unknown> | null;
  lat: number | null;
  lng: number | null;
  created_at: string;
};

export type Experience = {
  id: string;
  community_id: string;
  title: string;
  description: string | null;
  duration: string | null;
  price: number | null;
  host_id: string;
  created_at: string;
};

export type Booking = {
  id: string;
  user_id: string;
  experience_id: string | null;
  homestay_id: string | null;
  status: "pending" | "confirmed" | "declined" | "cancelled";
  date: string;
  created_at: string;
};

export type Homestay = {
  id: string;
  community_id: string;
  family_name: string;
  rooms: number | null;
  availability: Record<string, unknown> | null;
  price: number | null;
  created_at: string;
};

export type ImpactMetric = {
  id: string;
  community_id: string;
  year: number;
  income: number | null;
  employment: number | null;
  women_participation: number | null;
  youth_participation: number | null;
  created_at: string;
};

export type HeritageType = "story" | "music" | "food" | "craft" | "festival";

export type HeritageContent = {
  id: string;
  community_id: string;
  type: HeritageType;
  title: string;
  description: string | null;
  media_url: string | null;
  created_at: string;
};
