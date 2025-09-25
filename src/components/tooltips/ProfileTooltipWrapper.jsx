import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import ProfileTooltip from "@/components/tooltips/ProfileTooltip";

const TooltipWrapper = ({ children, user }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState(null);
  const triggerRef = useRef(null);
  let tooltipTimeout = null;

  const handleMouseEnter = () => {
    if (tooltipTimeout) clearTimeout(tooltipTimeout);

    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const tooltipHeight = 300; // Adjust based on ProfileTooltip height
      const spaceBelow = viewportHeight - rect.bottom;
      const showAbove = spaceBelow < tooltipHeight + 16;

      setTooltipPos({
        top: showAbove
          ? rect.top + window.scrollY
          : rect.bottom + window.scrollY,
        left: rect.left + window.scrollX + rect.width / 2,
        showAbove,
      });
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    tooltipTimeout = setTimeout(() => {
      setShowTooltip(false);
    }, 150);
  };

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </span>
      {showTooltip &&
        tooltipPos &&
        createPortal(
          <div
            className="absolute z-50"
            style={{
              top: tooltipPos.top,
              left: tooltipPos.left,
              transform: tooltipPos.showAbove
                ? "translate(-50%, -100%)"
                : "translate(-50%, 0)",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ProfileTooltip userid={user._id} username={user.username} />
          </div>,
          document.body
        )}
    </>
  );
};

export default TooltipWrapper;
