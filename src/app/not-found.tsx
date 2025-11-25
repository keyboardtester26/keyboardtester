export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-4 py-16 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
        404 · Page not found
      </p>
      <h1 className="text-balance text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
        This page doesn&apos;t exist, but your keyboard still does.
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-zinc-600">
        The link you followed might be broken or the page may have been moved.
        You can go back to the home page and continue testing your keyboard.
      </p>
      <a
        href="/"
        className="mt-2 inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800"
      >
        Back to keyboard tester
      </a>
    </div>
  );
}


