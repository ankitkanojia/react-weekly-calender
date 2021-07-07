import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import React, { useState } from "react";
import "resize-observer-polyfill/dist/ResizeObserver.global";
import { TimeGridScheduler, classes, DefaultEventRootComponent } from "@remotelock/react-week-scheduler";
import "@remotelock/react-week-scheduler/index.css";
import './index.module.scss';
import PropTypes from 'prop-types';
import { ReactComponent as DeleteIcon } from "./outline-delete-24px.svg";

// node_modules\@remotelock\react-week-scheduler\src\hooks\useMousetrap.ts
// node_modules\@remotelock\react-week-scheduler\src\components\TimeGridScheduler.tsx
// import { ExtendedKeyboardEvent } from "mousetrap";

const rangeStrings = [
  ["2019-03-03T22:45:00.000Z", "2019-03-04T01:15:00.000Z"],
  ["2019-03-04T22:15:00.000Z", "2019-03-05T01:00:00.000Z"],
  ["2019-03-05T22:00:00.000Z", "2019-03-06T01:00:00.000Z"],
  ["2019-03-06T22:00:00.000Z", "2019-03-07T01:00:00.000Z"],
  ["2019-03-07T05:30:00.000Z", "2019-03-07T10:00:00.000Z"],
  ["2019-03-08T22:00:00.000Z", "2019-03-09T01:00:00.000Z"],
  ["2019-03-09T22:00:00.000Z", "2019-03-10T01:00:00.000Z"]
];

const EventRoot = React.forwardRef(function EventRoot(
  { handleDelete, disabled, ...props },
  ref,
) {
  return (
    <Tippy 
      arrow
      interactive
      isEnabled={!disabled}
      hideOnClick={false}
      
      content={
        <span disabled={disabled} onClick={handleDelete}>
          <DeleteIcon style={{filter : "invert(100%)"}} />
        </span>
      }
    >
      <DefaultEventRootComponent
        handleDelete={handleDelete}
        disabled={disabled}
        {...props}
        ref={ref}
      />
    </Tippy >
  );
});


const defaultSchedule = rangeStrings.map(range =>
  range.map(dateString => new Date(dateString))
);

export default function App() {
  const [schedule, setSchedule] = useState(defaultSchedule);

  return (
    <div
      className="root"
      style={{
        width: "100vw",
        height: "600px",
        "--cell-height": "20px",
        "--cell-width": "50px"
      }}
    >
      <TimeGridScheduler
        classes={classes}
        style={{ width: "100%", height: "100%" }}
        originDate={new Date("2019-03-04")}
        schedule={schedule}
        onChange={setSchedule}
        visualGridVerticalPrecision={15}
        verticalPrecision={15}
        cellClickPrecision={60}
        eventRootComponent={EventRoot}
      />
    </div>
  );
}

App.propTypes = {
  className: PropTypes.string,
  classes: typeof import('./styles/styles.module.scss').default,
  style: React.CSSProperties,
  cellIndex: PropTypes.number,
  rangeIndex: PropTypes.number,
  isActive: PropTypes.bool,
  disabled: PropTypes.bool
};