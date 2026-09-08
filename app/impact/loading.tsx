export default function LoadingImpact() {
  return (
    <div className="animate-pulse py-16">
      <div className="h-8 w-64 rounded bg-forest/10" />
      <div className="mt-2 h-4 w-96 max-w-full rounded bg-forest/10" />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border border-forest/10 p-4">
            <div className="h-3 w-20 rounded bg-forest/10" />
            <div className="mt-2 h-6 w-16 rounded bg-forest/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
