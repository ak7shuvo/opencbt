export default function LoadingHeritage() {
  return (
    <div className="animate-pulse py-16">
      <div className="h-8 w-56 rounded bg-forest/10" />
      <div className="mt-2 h-4 w-96 max-w-full rounded bg-forest/10" />
      <div className="mt-6 flex gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-4 w-14 rounded bg-forest/10" />
        ))}
      </div>
      <div className="mt-8 space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border-b border-forest/10 py-6 first:pt-0">
            <div className="h-3 w-20 rounded bg-forest/10" />
            <div className="mt-2 h-5 w-56 rounded bg-forest/10" />
            <div className="mt-2 h-4 w-full max-w-md rounded bg-forest/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
