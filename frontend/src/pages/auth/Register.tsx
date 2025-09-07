
import AuthLayout from "../../features/auth/components/AuthLayout";
import RegisterForm from "../../features/auth/components/RegisterForm";

export default function Register() {

  const handleRegisterSuccess = () => {
    // Registration handled by RegisterForm component
    // The component will redirect internally after success
  };

  return (
    <AuthLayout
      title="Create Your Legend ⚔️"
      subtitle="Begin your heroic journey with Skill Forge"
    >
      <RegisterForm onSuccess={handleRegisterSuccess} />
    </AuthLayout>
  );
}
