import { Status } from ".";

const StatusButton = ({
  status,
  onChangeStatus,
  onSetLeftTime,
}: {
  status: Status;
  onChangeStatus: (newStatus: Status) => void;
  onSetLeftTime: () => void;
}) => {
  const handleClickButton = (
    buttonType: "Start" | "Pause" | "Resume" | "Stop" | "Reset"
  ) => {
    if (buttonType === "Resume") onChangeStatus("InProgress");
    if (buttonType === "Pause") onChangeStatus("Paused");
    if (buttonType === "Stop" || buttonType === "Reset")
      onChangeStatus("NotStarted");
  };

  const handelClickStart = () => {
    onChangeStatus("InProgress");
    onSetLeftTime();
  };

  if (status === "InProgress") {
    return (
      <CommonButton
        text="일시정지"
        onClick={() => handleClickButton("Pause")}
        isFilled
      />
    );
  }

  if (status === "Paused") {
    return (
      <div className="flex justify-between gap-2">
        <CommonButton
          text="이어하기"
          onClick={() => handleClickButton("Resume")}
          isFilled
        />
        <CommonButton
          text="그만하기"
          onClick={() => handleClickButton("Stop")}
        />
      </div>
    );
  }

  if (status === "Finished") {
    return (
      <CommonButton text="초기화" onClick={() => handleClickButton("Reset")} />
    );
  }

  return <CommonButton text="시작" onClick={handelClickStart} isFilled />;
};

export default StatusButton;

const CommonButton = ({
  isFilled = false,
  text,
  onClick,
}: {
  isFilled?: boolean;
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      className={`rounded-full py-1 w-full border border-emerald-400 font-semibold text-sm ${
        isFilled
          ? "bg-emerald-400 text-zinc-900"
          : "bg-transparent text-emerald-400"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
