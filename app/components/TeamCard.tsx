import Link from "next/link";

type TeamMember = {
  name: string;
  role: string;
  linkedin?: string;
};

export default function TeamCard({ name, role, linkedin }: TeamMember) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-2xl font-bold">
        {name.charAt(0)}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">{role}</p>
      {linkedin && (
        <Link
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#800000] hover:text-[#a00000] font-medium"
        >
          LinkedIn →
        </Link>
      )}
    </div>
  );
}

