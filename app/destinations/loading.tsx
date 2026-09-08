export default function LoadingDestinations() {
  return (
    <div className="animate-pulse py-16">
      <div className="h-8 w-48 rounded bg-forest/10" />
      <div className="mt-2 h-4 w-80 max-w-full rounded bg-forest/10" />
      <div className="mt-8 h-80 w-full rounded bg-forest/10" />
      <div className="mt-8 space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border-b border-forest/10 py-6 first:pt-0">
            <div className="h-5 w-40 rounded bg-forest/10" />
            <div className="mt-2 h-4 w-full max-w-md rounded bg-forest/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
