import Section from "./components/Section";
import AnimatedText from "./components/AnimatedText";
import InteractiveDiagram from "./components/InteractiveDiagram";
import RollingPerformance from "./components/RollingPerformance";

export default function Page() {
  return (
    <main className="font-sans">
      {/* 1. Hero - Red */}
       {/* 1. Hero - Red */}
       <Section theme="red">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedText title="Protecting Capital and Driving Long-Term Success" />
          <p className="mt-6 text-xl sm:text-2xl text-white/90">
            A data-driven approach to investment strategy
          </p>
          <p className="mt-8 text-lg text-white/80">
            Scroll to explore our data interactively
          </p>
 
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6 text-white">
            <div>
              <p className="text-3xl font-semibold">18.94%</p>
              <p className="text-white/70 text-sm mt-1">
                Annualized Gross Return
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold">16.83%</p>
              <p className="text-white/70 text-sm mt-1">
                Annualized Net Return
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold">6.54%</p>
              <p className="text-white/70 text-sm mt-1">Annualized Net Alpha</p>
            </div>
            <div>
              <p className="text-3xl font-semibold">1.49</p>
              <p className="text-white/70 text-sm mt-1">Net Sharpe Ratio</p>
            </div>
            <div>
              <p className="text-3xl font-semibold">58.66%</p>
              <p className="text-white/70 text-sm mt-1">
                Net Up Market Capture
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold">7.6%</p>
              <p className="text-white/70 text-sm mt-1">
                Net Down Market Capture
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 2. The Model - Black */}
      <Section theme="black">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <h2 className="text-3xl sm:text-5xl font-bold mb-8 text-[#800000]">The Model</h2>
          <InteractiveDiagram />
        </div>
      </Section>

      {/* 3. 3-Year Rolling Performance - Black */}
      <Section theme="black">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <h2 className="text-3xl sm:text-5xl font-bold mb-8 text-[#800000]">
            3-Year Rolling Performance vs Benchmark
          </h2>
          <RollingPerformance />
        </div>
      </Section>
    </main>
  );
}
