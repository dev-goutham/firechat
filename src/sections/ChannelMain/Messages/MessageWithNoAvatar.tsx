import React from "react";

export const MessageWithNoAvatar: React.FC<{ message: string }> = ({
  message,
}) => {
  return (
    <div className="Message no-avatar">
      <div className="MessageContent">{message}</div>
    </div>
  );
};
