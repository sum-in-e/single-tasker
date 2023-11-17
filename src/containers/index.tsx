import { useState } from "react";
import TaskInput from "./TaskInput";
import TimerContainer from "./TimerContainer";

export type Status = "NotStarted" | "InProgress" | "Paused" | "Finished";

const MainContainer = () => {
  const [status, setStatus] = useState<Status>("NotStarted");

  const handleChangeStatus = (newStatus: Status) => {
    setStatus(newStatus);
  };

  return (
    <main>
      <section className="flex justify-center items-center my-3 px-3 min-h-[40px]">
        <TaskInput status={status} />
      </section>
      <section className="flex justify-center items-center flex-col">
        <TimerContainer status={status} onChangeStatus={handleChangeStatus} />
      </section>
    </main>
  );
};

export default MainContainer;
