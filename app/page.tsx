import Section from "./components/Section";
import AnimatedText from "./components/AnimatedText";
import PerformanceChart from "./components/PerformanceChart";
import TurnoverSlider from "./components/TurnoverSlider";

export default function Page() {
  return (
    <main className="font-sans">
      {/* 1. Hero - Red */}
      <Section theme="red">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedText title="Predicting Fundamentals — Not Just Returns" />
          <p className="mt-6 text-xl sm:text-2xl text-white/90">
            A data-driven approach to investment strategy
          </p>
          <p className="mt-8 text-lg text-white/80">
            Scroll to explore our methodology
          </p>
        </div>
      </Section>

      {/* 2. Executive Summary - Black */}
      <Section theme="black">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-[#800000]">
            Executive Summary
          </h2>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            Our model predicts fundamental business metrics, enabling more informed investment decisions beyond simple return forecasting.
          </p>
        </div>
      </Section>

      {/* 3. Strategy - Red */}
      <Section theme="red">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-white">
            Strategy
          </h2>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Leveraging machine learning and fundamental data analysis to focus on business fundamentals rather than short-term price movements.
          </p>
        </div>
      </Section>

      {/* 4. Results - Black */}
      <Section theme="black">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <h2 className="text-3xl sm:text-5xl font-bold mb-8 text-[#800000]">
            Results
          </h2>
          <div className="mb-12">
            <PerformanceChart />
          </div>
          <div className="mt-8">
            <TurnoverSlider />
          </div>
        </div>
      </Section>

      {/* 5. Discussion - Red */}
      <Section theme="red">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-white">
            Key Takeaways
          </h2>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            This demo represents our live investment process visualization for the McGill FIAM Hackathon.
          </p>
        </div>
      </Section>
    </main>
  );
}
