"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

export const FY26_BRIEF_LAST = 7;

export type Fy26BriefHandle = {
  next: () => boolean;
  prev: () => boolean;
  enterFrom: (direction: 1 | -1) => void;
};

const BRIEF_ORIGIN =
  typeof window === "undefined" ? "" : window.location.origin;

function postBrief(
  frame: HTMLIFrameElement | null,
  index: number,
) {
  frame?.contentWindow?.postMessage(
    { source: "tech-ambition", action: "goto", index },
    BRIEF_ORIGIN || window.location.origin,
  );
}

export const Fy26BriefSlide = forwardRef<Fy26BriefHandle>(
  function Fy26BriefSlide(_props, ref) {
    const frameRef = useRef<HTMLIFrameElement>(null);
    const indexRef = useRef(0);

    useImperativeHandle(ref, () => ({
      next() {
        if (indexRef.current >= FY26_BRIEF_LAST) return false;
        indexRef.current += 1;
        postBrief(frameRef.current, indexRef.current);
        return true;
      },
      prev() {
        if (indexRef.current <= 0) return false;
        indexRef.current -= 1;
        postBrief(frameRef.current, indexRef.current);
        return true;
      },
      enterFrom(direction) {
        indexRef.current = direction < 0 ? FY26_BRIEF_LAST : 0;
        postBrief(frameRef.current, indexRef.current);
      },
    }));

    return (
      <iframe
        ref={frameRef}
        title="CoDesign FY26 leadership brief"
        src="/newsletters/fy26-leadership-brief.html?embed=1"
        className="h-full w-full border-0 [pointer-events:none]"
        onLoad={() => postBrief(frameRef.current, indexRef.current)}
      />
    );
  },
);
