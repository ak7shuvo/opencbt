export default function OfflinePage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center">
      <p className="text-[10px] uppercase tracking-[0.3em] text-forest/50">
        No connection
      </p>
      <h1 className="mt-4 font-display text-3xl text-forest">
        You&apos;re offline.
      </h1>
      <p className="mt-4 text-sm leading-7 text-ink/60">
        OpenCBT needs an internet connection to load destinations,
        experiences, and homestays. Reconnect and try again.
      </p>
    </div>
  );
}
