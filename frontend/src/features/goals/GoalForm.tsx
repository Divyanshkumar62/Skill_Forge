import { useState } from "react";
import { Goal } from "./types";

interface Props {
  onSubmit: (data: Partial<Goal>) => void;
  initialData?: Partial<Goal>;
}

export default function GoalForm({ onSubmit, initialData }: Props) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [dueDate, setDueDate] = useState(
    initialData?.dueDate?.slice(0, 10) || ""
  );

  const handleSubmit = () => {
    onSubmit({ title, description, dueDate });
  };

  return (
    <div className="border rounded p-4 bg-white mb-4">
      <h3 className="font-bold mb-2">
        {initialData ? "Edit Goal" : "New Goal"}
      </h3>
      <input
        className="border p-2 w-full mb-2 rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 w-full mb-2 rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        className="border p-2 w-full mb-2 rounded"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        {initialData ? "Update" : "Create"}
      </button>
    </div>
  );
}
