import { FaFire } from "react-icons/fa";

interface AuthHeaderProps {
  showXpBar?: boolean;
  welcomeText?: string;
}

export default function AuthHeader({
  showXpBar = true,
  welcomeText = "Welcome to Skill Forge"
}: AuthHeaderProps) {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <FaFire className="text-3xl text-orange-500" />
        <h1 className="text-3xl font-bold text-slate-100">
          {welcomeText}
        </h1>
      </div>

      {showXpBar && (
        <div className="text-slate-400 text-lg">
          Master your skills, level up your life! 🚀
        </div>
      )}
    </div>
  );
}
