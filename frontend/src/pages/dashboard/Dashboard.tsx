import DashboardLayout from "../../layouts/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-semibold mb-4">
        Welcome to your Dashboard 👋
      </h2>
      <p className="text-gray-600">Start by adding your first goal or habit!</p>
    </DashboardLayout>
  );
}
