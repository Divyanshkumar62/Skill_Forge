import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface ProgressOverviewProps {
  activeHabits: number;
  pendingTasks: number;
  completedTasks: number;
  currentXp: number;
  level: number;
  nextLevelXp: number;
}

export default function ProgressOverview({
  activeHabits,
  pendingTasks,
  completedTasks,
  currentXp,
  level,
  nextLevelXp
}: ProgressOverviewProps) {
  // Task completion data for pie chart
  const taskData = [
    { name: 'Completed Tasks', value: completedTasks, color: '#10B981' },
    { name: 'Pending Tasks', value: pendingTasks, color: '#F59E0B' }
  ];

  // XP progress data for bar chart
  const xpData = [
    {
      name: 'Current Level XP',
      current: currentXp % (level * 100), // Current level progress
      needed: level * 100 // XP needed for this level
    }
  ];

  return (
    <div className="space-y-6">
      {/* Task Progress */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Today's Task Progress 🥧</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={taskData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {taskData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* XP Progress */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">XP Progress ⚡</h3>
        <div className="mb-4">
          <p className="text-sm text-gray-600">Level {level}</p>
          <p className="text-lg font-medium">{currentXp} / {level * 100} XP this level</p>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
            <div
              className="bg-purple-600 h-3 rounded-full"
              style={{ width: `${((currentXp % (level * 100)) / (level * 100)) * 100}%` }}
            ></div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={xpData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="current" fill="#8B5CF6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Habit Statistics */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Habit Statistics 📊</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">{activeHabits}</p>
            <p className="text-sm text-gray-600">Active Habits</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
            <p className="text-sm text-gray-600">Completed Tasks</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">{currentXp}</p>
            <p className="text-sm text-gray-600">Total XP</p>
          </div>
        </div>
      </div>
    </div>
  );
}
