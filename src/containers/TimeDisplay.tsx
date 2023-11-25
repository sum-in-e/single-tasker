import { ChangeEvent } from "react";

interface Props {
  status: string;
  leftTime: number;
  initTime: number;
  onChangeTimer: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TimeDisplay = ({ status, initTime, leftTime, onChangeTimer }: Props) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // 한 자릿수일 경우 앞에 '0'을 추가
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  if (status === "NotStarted") {
    return (
      <input
        type="number"
        value={initTime}
        className="w-12 px-1 rounded-sm outline-none"
        onChange={onChangeTimer}
        max={90}
        min={0}
      />
    );
  }

  if (status === "Finished") {
    return <span className="text-xl font-semibold text-zinc-100">Done!🎉</span>;
  }

  return (
    <span className="text-xl font-semibold text-zinc-100">
      {formatTime(leftTime)}
    </span>
  );
};

export default TimeDisplay;
