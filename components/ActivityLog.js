import React from "react";

const ActivityLog = props => {
  return !!props.activityLog ? (
    <>
      <ul className="overflow-list activity-list">
        {props.activityLog.map((activity, index) => {
          return (
            <li className="activity-item" key={`${activity},${index}`}>
              {activity}
            </li>
          );
        })}
      </ul>
    </>
  ) : null;
};

export default ActivityLog;
