
import AuthLayout from "../../features/auth/components/AuthLayout";
import LoginForm from "../../features/auth/components/LoginForm";
import { useAuth } from "../../features/auth/store";

export default function Login() {
  const login = useAuth((s) => s.login);

  const handleLoginSuccess = (userData: any) => {
    // Store token and user data in auth store with correct AuthResponse format
    const authResponse = {
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        xp: userData.xp,
        level: userData.level,
      },
      token: userData.token,
    };

    // Store in auth store
    login(authResponse);

    // Also store badges in gamification store if available
    if (userData.badges) {
      import("../../features/gamification/store").then(m => {
        const { useGamification } = m;
        const { loadBadgeData } = useGamification.getState();
        loadBadgeData();
      });
    }
  };

  return (
    <AuthLayout
      title="Welcome Back, Hero!"
      subtitle="Resume your epic quest and continue your leveling journey"
    >
      <LoginForm onSuccess={handleLoginSuccess} />
    </AuthLayout>
  );
}
