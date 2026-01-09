import { useState } from "react";
import { getEnvVar } from "../envVariablesAccess";

function ErrorThrower(): never {
  throw new Error("Test error - this was triggered by the button");
}

export default function TestView() {
  const baseUrl = getEnvVar("BACKEND_URL");
  const [shouldThrow, setShouldThrow] = useState(false);

  const throwError = () => {
    setShouldThrow(true);
  };

  if (shouldThrow) {
    return <ErrorThrower />;
  }

  return (
    <div>
      <div>Test view! ({baseUrl})</div>
      <button onClick={throwError} className="btn btn-primary">
        Throw error
      </button>
    </div>
  );

  // For 4 tiles with date picker
  // const [date, setDate] = useState<Date>(new Date());
  // return (
  //   <div className="flex h-full flex-col">
  //     <div className="mx-auto w-full max-w-xs">
  //       <SingleDatePicker
  //         date={date}
  //         setDate={(i) => {
  //           setDate(i!);
  //         }}
  //       />
  //     </div>

  //     <div className="min-h-0 flex-1 overflow-hidden">
  //       <div className="grid h-full grid-cols-2 grid-rows-2">
  //         <div>a</div>
  //         <div>b</div>
  //         <div>c</div>
  //         <div>d</div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
