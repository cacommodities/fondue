import {
  ModalWithActionsWithTrigger,
  Popper,
  ReactEChartsWrapper,
  SingleDatePicker,
  Tooltip,
  useThemeListener,
} from "@cac/react-utils";
import { startOfToday } from "date-fns";
import { useState } from "react";

function DatePickerPreview() {
  const [date, setDate] = useState(startOfToday());
  return (
    <div>
      <SingleDatePicker date={date} setDate={(date) => setDate(date!)} />
    </div>
  );
}

function ModalPreview() {
  return (
    <div>
      <ModalWithActionsWithTrigger
        triggerElement={() => <div className="btn btn-primary">Open Modal</div>}
        contentElement={() => <div className="p-4">Modal Content</div>}
        actionsElement={(close) => (
          <div className="p-4">
            <button className="btn btn-primary" onClick={close}>
              Close
            </button>
          </div>
        )}
      />
    </div>
  );
}

function ReactEchartsPreview() {
  const option = {
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 200,
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "line",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };
  return (
    <div>
      <ReactEChartsWrapper
        style={{ width: "100%", height: "300px" }}
        option={option}
        daisy5Theme
      />
    </div>
  );
}

function ThemePreview() {
  const theme = useThemeListener();
  return (
    <div>
      <div className="flex flex-col">
        {Object.entries(theme.colors).map(([key, value]) => (
          <div
            key={key}
            style={{ backgroundColor: value.toString() }}
            className="p-1 text-white text-shadow-black text-shadow-md"
          >
            {key}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ComponentsShowcase() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="border-4 p-4">
        <div>Date Picker</div>
        <DatePickerPreview />
      </div>
      <div className="border-4 p-4">
        <div>Tooltip</div>
        <Tooltip text="This is a tooltip">
          <div className="btn btn-primary">Hover me</div>
        </Tooltip>
      </div>
      <div className="border-4 p-4">
        <div>Popper</div>
        <div className="flex gap-4">
          <Popper
            triggerEl={() => <div className="btn btn-primary">Click me</div>}
            offset={[10, 0]}
            content={() => (
              <div className="bg-base-100 border-primary border-2 p-4">
                <img
                  src="https://placecats.com/300/200"
                  alt="Random"
                  className="h-[200px] w-[300px]"
                />
              </div>
            )}
            placement="auto"
          />
          <Popper
            triggerEl={() => <div className="btn btn-primary">Hover me</div>}
            offset={[10, 0]}
            onHover
            content={() => (
              <div className="bg-base-100 border-primary border-2 p-4">
                <img src="https://placecats.com/300/200" alt="Random" />
              </div>
            )}
            placement="auto"
          />
        </div>
      </div>
      <div className="border-4 p-4">
        <div>Modal</div>
        <ModalPreview />
      </div>
      <div className="border-4 p-4">
        <div>React ECharts</div>
        <ReactEchartsPreview />
      </div>
      <div className="border-4 p-4">
        <div>Theme preview</div>
        <ThemePreview />
      </div>
    </div>
  );
}
