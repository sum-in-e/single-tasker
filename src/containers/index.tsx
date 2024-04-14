import { useState } from "react";
import TaskInput from "./TaskInput";
import TimerContainer from "./TimerContainer";
import StatusButton from "./StatusButton";
import ReasonInput from "./ReasonInput";

export type Status = "NotStarted" | "InProgress" | "Paused" | "Finished";

const MainContainer = () => {
  const [status, setStatus] = useState<Status>("NotStarted");

  const handleChangeStatus = (newStatus: Status) => {
    setStatus(newStatus);
  };

  // TODO: 그만하면 모든 입력 칸 초기화 될 것
  // TODO: 생각보다 크기가 크다. 조절할 수 있게 만들어야겠다.

  return (
    <main className="flex items-center gap-5 h-screen px-4">
      <div className="flex gap-3 w-full">
        <ReasonInput status={status} />
        <TaskInput status={status} />
        <TimerContainer status={status} onChangeStatus={handleChangeStatus} />
      </div>
      <StatusButton status={status} onChangeStatus={handleChangeStatus} />
    </main>
  );
};

export default MainContainer;
