const pdfUrl = "/fiam-hackathon-presentation.pdf";

export default function PresentationPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col pt-24 pb-12">
      <section className="px-6 md:px-12">
        <div className="max-w-5xl mx-auto border border-white/10 bg-black/40 rounded-2xl px-6 py-8 md:px-10 md:py-12 shadow-xl">
          <h1 className="text-3xl md:text-4xl font-bold">
            FIAM Hackathon Presentation
          </h1>
          <p className="mt-4 text-base text-white/70">
            View the slide deck below or download a copy to review later.
          </p>
          <a
            href={pdfUrl}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-white text-neutral-900 px-4 py-2 text-sm font-medium shadow hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white focus-visible:ring-offset-neutral-950 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download PDF
          </a>
        </div>
      </section>

      <section className="flex-1 mt-10 px-6 md:px-12">
        <object
          data={`${pdfUrl}#toolbar=0`}
          type="application/pdf"
          className="h-[calc(100vh-18rem)] w-full rounded-2xl border border-white/10 shadow-xl"
        >
          <div className="px-6 py-10 md:px-12">
            <p className="text-white/80">
              Your browser was unable to display the PDF. You can{" "}
              <a
                href={pdfUrl}
                className="underline hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                download the presentation
              </a>{" "}
              and open it locally.
            </p>
          </div>
        </object>
      </section>
    </main>
  );
}

