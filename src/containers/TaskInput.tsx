import { ChangeEvent, useState } from "react";
import { Status } from ".";

const TaskInput = ({ status }: { status: Status }) => {
  const [task, setTask] = useState("");

  const handleChangeTask = (event: ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  return (
    <div className="flex flex-col gap-1 text-zinc-100 text-sm w-full">
      <label
        className={`text-[10px] ${
          status !== "NotStarted" && "text-zinc-400"
        } text-zinc-400"`}
      >
        어떤 일을
      </label>
      <input
        className="bg-transparent border-b border-zinc-700 outline-none"
        onChange={handleChangeTask}
        value={task}
        placeholder="면접 준비를"
        readOnly={status === "NotStarted" ? false : true}
      />
    </div>
  );
};

export default TaskInput;
