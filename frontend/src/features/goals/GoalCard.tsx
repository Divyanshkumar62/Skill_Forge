import { Goal } from "./types";

interface Props {
  goal: Goal;
  onDelete: (id: string) => void;
  onEdit: (goal: Goal) => void;
}

export default function GoalCard({ goal, onDelete, onEdit }: Props) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-md mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{goal.title}</h3>
        <div className="flex gap-2">
          <button onClick={() => onEdit(goal)} className="text-blue-500">
            Edit
          </button>
          <button onClick={() => onDelete(goal._id)} className="text-red-500">
            Delete
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
      <div className="w-full bg-gray-200 h-2 mt-3 rounded">
        <div
          className="bg-green-500 h-2 rounded"
          style={{ width: `${goal.progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        {goal.milestones.length} milestones
      </p>
    </div>
  );
}
