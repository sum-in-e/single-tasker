import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { Status } from ".";

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
    const newTime = inputTime > 90 ? 90 : inputTime;

    setInitTime(newTime);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // 한 자릿수일 경우 앞에 '0'을 추가
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const decreaseTime = useCallback(() => {
    if (leftTime - 1 > 0) {
      setLeftTime((prev) => prev - 1);
    } else {
      onChangeStatus("Finished");
    }
  }, [leftTime, onChangeStatus]);

  useEffect(() => {
    if (status === "InProgress" && leftTime === 0) {
      // 최초 시작
      const seconds = initTime * 60;
      setLeftTime(seconds);
    }

    if (status === "NotStarted" && leftTime !== 0) {
      setLeftTime(0);
    }
  }, [initTime, leftTime, status]);

  useEffect(() => {
    // TODO: leftTime이 줄어들면서 TimerContainer 컴포넌트는 계속 리렌더링되고 이 useEffect도 계속 실행되어 setInterval이 계속 된다. 해결 필요
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

  return (
    <div className="flex flex-col text-zinc-100 gap-1 flex-shrink-0 w-16">
      <label
        className={`text-[10px] ${
          status !== "NotStarted" && "text-zinc-400"
        } text-zinc-400"`}
      >
        몇 분간 한다.
      </label>

      {status === "NotStarted" ? (
        <input
          type="number"
          value={initTime}
          className="bg-transparent border-b border-zinc-700 outline-none"
          onChange={handleChangeTimer}
          max={90}
          min={0}
        />
      ) : (
        <div className="bg-transparent border-b h-full border-zinc-700 outline-none">
          {status !== "Finished" ? formatTime(leftTime) : "Done🎉"}
        </div>
      )}
    </div>
  );
};

export default TimerContainer;
