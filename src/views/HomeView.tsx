import { getEnvVar } from "../envVariablesAccess";

export default function HomeView() {
  const baseUrl = getEnvVar("BACKEND_URL");

  return (
    <div>
      <div>Hello, world! ({baseUrl})</div>
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
