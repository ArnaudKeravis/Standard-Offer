"use client";

import { motion } from "framer-motion";

import { StaggerIn, staggerItem } from "@/components/workshops/tech-ambition/slide-frame";
import {
  GBS_ROADMAP,
  ROADMAP_TRACKS,
  SALES_ROADMAP,
  SUPPLY_ROADMAP,
  roadmapTrackByScreenId,
} from "@/lib/workshops/tech-ambition/run-of-show";

export function RoadmapRosterSlide() {
  return (
    <div className="relative flex h-full w-full flex-col bg-[var(--ws-paper)] px-[5.5vw] pb-[8vh] pt-[12vh]">
      <p className="ws-kicker text-[var(--ws-blue)]">15:20 · 20 minutes</p>
      <h1 className="ws-display mt-3 max-w-5xl text-[clamp(2.1rem,4vw,3.3rem)] text-[var(--ws-ink)]">
        AI agents strategy sharing
      </h1>
      <p className="mt-4 max-w-3xl text-[1.15rem] text-[var(--ws-muted)]">
        Six leaders. Three minutes each. What is live, what is next, what is
        blocked. Then we build.
      </p>
      <StaggerIn className="mt-8 grid flex-1 grid-cols-3 gap-4">
        {ROADMAP_TRACKS.map((track, index) => (
          <motion.article
            key={track.id}
            variants={staggerItem}
            className="rounded-[24px] bg-white px-5 py-5"
          >
            <p className="ws-kicker text-[var(--ws-bronze,#b28b4e)]">
              0{index + 1} · {track.host}
            </p>
            <h2 className="ws-display mt-3 text-[1.35rem] text-[var(--ws-ink)]">
              {track.title}
            </h2>
            <p className="mt-2 text-sm font-semibold text-[var(--ws-navy)]">{track.stage}</p>
          </motion.article>
        ))}
      </StaggerIn>
    </div>
  );
}

export function RoadmapTrackSlide({ screenId }: { screenId: string }) {
  const track = roadmapTrackByScreenId(screenId);
  if (track.id === "supply") return <SupplyRoadmapSlide />;
  if (track.id === "sales") return <SalesRoadmapSlide />;
  if (track.id === "gbs") return <GbsRoadmapSlide />;
  return <SpeakerRoadmapSlide track={track} />;
}

function SupplyRoadmapSlide() {
  return (
    <div className="relative flex h-full w-full flex-col bg-white px-[5.2vw] pb-[7vh] pt-[11vh]">
      <div className="flex items-baseline justify-between gap-6">
        <h1 className="ws-display text-[clamp(2.2rem,4vw,3.4rem)] text-[var(--ws-ink)]">
          Supply AI agents
        </h1>
        <p className="ws-kicker shrink-0 text-[var(--ws-bronze,#b28b4e)]">
          Kevin · Discovery
        </p>
      </div>
      <p className="mt-4 max-w-5xl text-[1.12rem] text-[var(--ws-muted)]">
        {SUPPLY_ROADMAP.what}
      </p>
      <p className="mt-2 text-[1.05rem] font-semibold text-[var(--ws-navy)]">
        {SUPPLY_ROADMAP.stage}
      </p>
      <div className="mt-7 grid grid-cols-3 gap-6 border-y border-[var(--ws-line)] py-6">
        {SUPPLY_ROADMAP.values.map((item) => (
          <div key={item.label}>
            <p className="ws-display text-[2.2rem] text-[var(--ws-blue)]">{item.value}</p>
            <p className="mt-2 text-sm text-[var(--ws-muted)]">{item.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid flex-1 grid-cols-2 gap-10">
        <div>
          <p className="ws-kicker text-[var(--ws-bronze,#b28b4e)]">Next milestone</p>
          <ol className="mt-4 space-y-3">
            {SUPPLY_ROADMAP.next.map((line, index) => (
              <li key={line} className="flex gap-3 text-[1.05rem] text-[var(--ws-ink)]">
                <span className="ws-timer text-[var(--ws-blue)]">
                  0{index + 1}
                </span>
                {line}
              </li>
            ))}
          </ol>
        </div>
        <div>
          <p className="ws-kicker text-[var(--ws-bronze,#b28b4e)]">What is blocking scale</p>
          <ul className="mt-4 space-y-3 text-[1.02rem] text-[var(--ws-muted)]">
            {SUPPLY_ROADMAP.blocked.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SalesRoadmapSlide() {
  return (
    <div className="relative flex h-full w-full flex-col bg-white px-[5.2vw] pb-[7vh] pt-[11vh]">
      <div className="flex items-baseline justify-between gap-6">
        <h1 className="ws-display text-[clamp(2.2rem,4vw,3.4rem)] text-[var(--ws-ink)]">
          Sales AI agents
        </h1>
        <p className="ws-kicker shrink-0 text-[var(--ws-bronze,#b28b4e)]">
          Alexandra · portfolio
        </p>
      </div>
      <div className="mt-8 grid flex-1 grid-cols-3 gap-5">
        <Column title="Live" rows={SALES_ROADMAP.live} />
        <Column title="Building" rows={SALES_ROADMAP.building} />
        <Column title="Planned" rows={SALES_ROADMAP.planned} />
      </div>
      <p className="mt-5 text-sm text-[var(--ws-muted)]">{SALES_ROADMAP.closed}</p>
    </div>
  );
}

function Column({
  title,
  rows,
}: {
  title: string;
  rows: readonly { name: string; value: string }[];
}) {
  return (
    <section className="rounded-[24px] bg-[var(--ws-paper)] px-5 py-5">
      <p className="ws-kicker text-[var(--ws-blue)]">{title}</p>
      <ul className="mt-5 space-y-5">
        {rows.map((row) => (
          <li key={row.name}>
            <p className="text-[1.08rem] font-semibold text-[var(--ws-ink)]">{row.name}</p>
            <p className="mt-1 text-sm text-[var(--ws-muted)]">{row.value}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function GbsRoadmapSlide() {
  return (
    <div className="relative flex h-full w-full flex-col bg-white px-[5.2vw] pb-[7vh] pt-[11vh]">
      <div className="flex items-baseline justify-between gap-6">
        <h1 className="ws-display text-[clamp(2.2rem,4vw,3.4rem)] text-[var(--ws-ink)]">
          AI for GBS & Tech
        </h1>
        <p className="ws-kicker shrink-0 text-[var(--ws-bronze,#b28b4e)]">
          Anshul · APMEA GBS
        </p>
      </div>
      <p className="mt-4 max-w-5xl text-[1.12rem] text-[var(--ws-muted)]">
        {GBS_ROADMAP.what}
      </p>
      <div className="mt-6 grid grid-cols-3 gap-6 border-y border-[var(--ws-line)] py-5">
        {GBS_ROADMAP.values.map((item) => (
          <div key={item.label}>
            <p className="ws-display text-[2.2rem] text-[var(--ws-blue)]">{item.value}</p>
            <p className="mt-2 text-sm text-[var(--ws-muted)]">{item.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid flex-1 grid-cols-3 gap-4">
        {GBS_ROADMAP.tracks.map((track) => (
          <article key={track.title} className="flex flex-col rounded-[24px] bg-[var(--ws-paper)] px-5 py-5">
            <p className="ws-kicker text-[var(--ws-blue)]">{track.status}</p>
            <h2 className="ws-display mt-3 text-[1.4rem] text-[var(--ws-ink)]">
              {track.title}
            </h2>
            <p className="mt-3 text-[1.02rem] leading-snug text-[var(--ws-muted)]">
              {track.body}
            </p>
          </article>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-10">
        <div>
          <p className="ws-kicker text-[var(--ws-bronze,#b28b4e)]">Next</p>
          <ul className="mt-3 space-y-2 text-[1.02rem] text-[var(--ws-ink)]">
            {GBS_ROADMAP.next.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="ws-kicker text-[var(--ws-bronze,#b28b4e)]">What is blocked</p>
          <ul className="mt-3 space-y-2 text-[1.02rem] text-[var(--ws-muted)]">
            {GBS_ROADMAP.blocked.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SpeakerRoadmapSlide({
  track,
}: {
  track: (typeof ROADMAP_TRACKS)[number];
}) {
  return (
    <div className="relative flex h-full w-full flex-col justify-center bg-white px-[6vw]">
      <p className="ws-kicker text-[var(--ws-bronze,#b28b4e)]">{track.host}</p>
      <h1 className="ws-display mt-4 max-w-4xl text-[clamp(2.6rem,5.4vw,4.6rem)] text-[var(--ws-ink)]">
        {track.title}
      </h1>
      <p className="mt-6 max-w-3xl text-[clamp(1.2rem,2vw,1.55rem)] text-[var(--ws-muted)]">
        {track.lede}
      </p>
      <div className="mt-10 grid max-w-4xl grid-cols-3 gap-4">
        {["What is live", "What is next", "What is blocked"].map((label) => (
          <p
            key={label}
            className="rounded-[20px] bg-[var(--ws-paper)] px-4 py-5 text-[1.05rem] font-semibold text-[var(--ws-navy)]"
          >
            {label}
          </p>
        ))}
      </div>
    </div>
  );
}
