import { ChangeEvent, useState } from "react";
import { Status } from ".";

const TaskInput = ({ status }: { status: Status }) => {
  const [task, setTask] = useState("");

  const handleChangeTask = (event: ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  if (status === "NotStarted") {
    return (
      <input
        className="bg-transparent border-b border-zinc-700 outline-none w-full p-1 text-zinc-100 text-sm"
        onChange={handleChangeTask}
        value={task}
        placeholder="어떤 일을 해야하나요?"
      />
    );
  }

  return <p className="text-zinc-100 truncate">{task || "🔥"}</p>;
};

export default TaskInput;
