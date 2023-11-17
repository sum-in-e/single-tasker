import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { Status } from ".";
import StatusButton from "./StatusButton";
import TimeDisplay from "./TimeDisplay";

const TimerContainer = ({
  status,
  onChangeStatus,
}: {
  status: Status;
  onChangeStatus: (newStatus: Status) => void;
}) => {
  const [initTime, setInitTime] = useState(0);
  const [leftTime, setLeftTime] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleChangeTimer = (event: ChangeEvent<HTMLInputElement>) => {
    const inputTime = parseInt(event.target.value, 10);
    const newTime = inputTime > 60 ? 60 : inputTime;
    const seconds = newTime * 60; // 분을 초로 변환

    setInitTime(newTime);
    setLeftTime(seconds);
  };

  const decreaseTime = useCallback(() => {
    if (leftTime - 1 > 0) {
      setLeftTime((prev) => prev - 1);
    } else {
      onChangeStatus("Finished");
    }
  }, [leftTime, onChangeStatus]);

  useEffect(() => {
    if (status === "InProgress") {
      intervalRef.current = setInterval(decreaseTime, 1000);
    } else if (status !== "NotStarted" && intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [decreaseTime, status]);

  const backgroundSize = `${360 - (360 * leftTime) / (initTime * 60)}deg`; // 배경 크기 계산

  return (
    <>
      <div
        className={`border-2 rounded-full w-32 border-zinc-600 aspect-square flex justify-center items-center bg-transparent`}
        style={{
          background:
            status === "InProgress" || status === "Paused"
              ? `conic-gradient(
        transparent ${backgroundSize}, 
        #34d399 0 ${backgroundSize})`
              : "",
        }}
      >
        <TimeDisplay
          status={status}
          initTime={initTime}
          leftTime={leftTime}
          onChangeTimer={handleChangeTimer}
        />
      </div>
      <div className="w-full px-5 mt-5">
        <StatusButton status={status} onChangeStatus={onChangeStatus} />
      </div>
    </>
  );
};

export default TimerContainer;
