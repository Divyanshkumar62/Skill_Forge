import { useState } from "react";
import { Goal } from "./types";
import { addMilestone, toggleMilestone, deleteMilestone } from "./api";

interface Props {
  goal: Goal;
  refresh: () => void;
}

export default function MilestoneList({ goal, refresh }: Props) {
  const [newMilestone, setNewMilestone] = useState("");

  const handleAdd = async () => {
    if (!newMilestone.trim()) return;
    await addMilestone(goal._id, newMilestone);
    setNewMilestone("");
    refresh();
  };

  const handleToggle = async (mId: string) => {
    await toggleMilestone(goal._id, mId);
    refresh();
  };

  const handleDelete = async (mId: string) => {
    await deleteMilestone(goal._id, mId);
    refresh();
  };

  return (
    <div className="mt-2 border-t pt-2">
      <h4 className="font-semibold mb-1">Milestones</h4>

      <ul className="space-y-2 mb-2">
        {goal.milestones.map((m) => (
          <li key={m._id} className="flex justify-between items-center">
            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={m.completed}
                onChange={() => handleToggle(m._id)}
              />
              <span className={m.completed ? "line-through text-gray-400" : ""}>
                {m.title}
              </span>
            </label>
            <button
              className="text-xs text-red-500"
              onClick={() => handleDelete(m._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <input
          type="text"
          value={newMilestone}
          onChange={(e) => setNewMilestone(e.target.value)}
          placeholder="New milestone"
          className="border p-1 rounded w-full"
        />
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-2 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}
