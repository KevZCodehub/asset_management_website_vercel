import TeamCard from "../components/TeamCard";

const teamMembers = [
  { name: "Daniel Boulanger", role: "Team Member", email: "daniel.boulanger@mail.mcgill.ca", linkedin: "https://www.linkedin.com/in/danielboulanger/" },
  { name: "Tomas Codina", role: "Team Member", email: "tomas.codina@mail.mcgill.ca", linkedin: "https://www.linkedin.com/in/tomas-codina-65408a314/" },
  { name: "Victor Garon", role: "Team Member", email: "victor.garon@mail.mcgill.ca", linkedin: "https://www.linkedin.com/in/victor-g-3744122aa/" },
  { name: "Francisco Rodriguez", role: "Team Member", email: "francisco.rodriguez@mail.mcgill.ca", linkedin: "https://www.linkedin.com/in/francisco-rodriguez1/" },
  { name: "Kevin Zhang", role: "Team Member", email: "kevin.zhang5@mail.mcgill.ca", linkedin: "https://www.linkedin.com/in/kevin-zhang-a668a0274/" },
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

