import TeamCard from "../components/TeamCard";

const teamMembers = [
  { name: "Daniel Boulanger", role: "Team Member", linkedin: "https://linkedin.com/in/daniel-boulanger" },
  { name: "Tomas Codina", role: "Team Member", linkedin: "https://linkedin.com/in/tomas-codina" },
  { name: "Victor Garon", role: "Team Member", linkedin: "https://linkedin.com/in/victor-garon" },
  { name: "Francisco Rodriguez", role: "Team Member", linkedin: "https://linkedin.com/in/francisco-rodriguez" },
  { name: "Kevin Zhang", role: "Team Member", linkedin: "https://linkedin.com/in/kevin-zhang" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-gray-900">
          Meet the Team
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Our team combines expertise in machine learning, quantitative finance, and data science to deliver innovative investment solutions.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} {...member} />
          ))}
        </div>
      </div>
    </main>
  );
}

