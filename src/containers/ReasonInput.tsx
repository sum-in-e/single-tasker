import { ChangeEvent, useState } from "react";
import { Status } from ".";

const ReasonInput = ({ status }: { status: Status }) => {
  const [reason, setReason] = useState("");

  const handleChangeReason = (event: ChangeEvent<HTMLInputElement>) => {
    setReason(event.target.value);
  };

  return (
    <div className="flex flex-col gap-1 text-zinc-100 text-sm w-full">
      <label
        className={`text-[10px] ${
          status !== "NotStarted" && "text-zinc-400"
        } text-zinc-400"`}
      >
        무엇을 위해서
      </label>
      <input
        className="bg-transparent border-b border-zinc-700 outline-none"
        onChange={handleChangeReason}
        value={reason}
        placeholder="XX 회사에 입사하기 위해서"
        readOnly={status === "NotStarted" ? false : true}
      />
    </div>
  );
};

export default ReasonInput;
