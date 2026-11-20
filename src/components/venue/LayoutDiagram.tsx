import { AnimatePresence, motion } from "framer-motion";
import type { LayoutId } from "@/data/venueData";
import { panelSwap } from "@/config/motion";

/**
 * Illustrative seating diagrams for the seven official layouts.
 * They show the arrangement style only; they are not scaled floor plans.
 */

const W = 400;
const H = 280;
const ROOM = { x: 14, y: 14, w: W - 28, h: H - 28 };

const tableStyle = { fill: "rgb(var(--color-stone))", stroke: "rgb(var(--color-olive))", strokeWidth: 1 };
const seatStyle = { fill: "rgb(var(--color-gold))" };

function Stage({ label = "Stage" }: { label?: string }) {
  return (
    <g>
      <rect x={W / 2 - 62} y={26} width={124} height={22} rx={2} fill="rgb(var(--color-olive))" />
      <text
        x={W / 2}
        y={41}
        textAnchor="middle"
        fontSize="8"
        letterSpacing="2"
        fill="rgb(var(--color-champagne))"
        style={{ fontFamily: "var(--font-sans)", textTransform: "uppercase", fontWeight: 600 }}
      >
        {label}
      </text>
    </g>
  );
}

function RoundTable({ cx, cy, seats, arcOnly = false }: { cx: number; cy: number; seats: number; arcOnly?: boolean }) {
  const points = Array.from({ length: seats }, (_, index) => {
    const angle = arcOnly ? (Math.PI * index) / (seats - 1) : (2 * Math.PI * index) / seats - Math.PI / 2;
    return { x: cx + Math.cos(angle) * 19.5, y: cy + Math.sin(angle) * 19.5 };
  });
  return (
    <g>
      {points.map((point, index) => (
        <circle key={index} cx={point.x} cy={point.y} r={3} {...seatStyle} />
      ))}
      <circle cx={cx} cy={cy} r={13} {...tableStyle} />
    </g>
  );
}

function Standing() {
  // Deterministic scatter so the diagram is identical on every render.
  const guests = Array.from({ length: 92 }, (_, index) => {
    const a = Math.sin(index * 12.9898) * 43758.5453;
    const b = Math.sin(index * 78.233) * 12543.1234;
    return { x: 34 + (a - Math.floor(a)) * (W - 68), y: 64 + (b - Math.floor(b)) * (H - 100) };
  });
  const poseurTables = [
    [90, 110],
    [200, 96],
    [310, 110],
    [140, 190],
    [260, 190],
    [60, 214],
    [340, 214],
  ];
  return (
    <g>
      <Stage />
      {guests.map((guest, index) => (
        <circle key={index} cx={guest.x} cy={guest.y} r={2.8} {...seatStyle} opacity={0.55 + (index % 4) * 0.15} />
      ))}
      {poseurTables.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={8} {...tableStyle} />
      ))}
    </g>
  );
}

function Dining() {
  const tables = [];
  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 6; col += 1) {
      tables.push({ cx: 50 + col * 60, cy: 96 + row * 62 });
    }
  }
  return (
    <g>
      <Stage label="Top Table" />
      {tables.map((table) => (
        <RoundTable key={`${table.cx}-${table.cy}`} {...table} seats={8} />
      ))}
    </g>
  );
}

function Theatre() {
  const seats = [];
  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 24; col += 1) {
      if (col === 11 || col === 12) continue;
      seats.push({ x: 43 + col * 13.7, y: 76 + row * 20 });
    }
  }
  return (
    <g>
      <Stage />
      {seats.map((seat, index) => (
        <rect key={index} x={seat.x - 3.6} y={seat.y - 3.6} width={7.2} height={7.2} rx={1.6} {...seatStyle} />
      ))}
    </g>
  );
}

function Classroom() {
  const desks = [];
  for (let row = 0; row < 5; row += 1) {
    for (let col = 0; col < 4; col += 1) {
      desks.push({ x: 36 + col * 86 + (col > 1 ? 14 : 0), y: 74 + row * 37 });
    }
  }
  return (
    <g>
      <Stage label="Front" />
      {desks.map((desk) => (
        <g key={`${desk.x}-${desk.y}`}>
          <rect x={desk.x} y={desk.y} width={70} height={9} rx={1.5} {...tableStyle} />
          {[0, 1, 2, 3, 4].map((seat) => (
            <circle key={seat} cx={desk.x + 7 + seat * 14} cy={desk.y + 17} r={3} {...seatStyle} />
          ))}
        </g>
      ))}
    </g>
  );
}

function Boardroom() {
  const table = { x: 82, y: 104, w: 236, h: 72 };
  const seats = [];
  for (let index = 0; index < 14; index += 1) {
    const x = table.x + 10 + index * ((table.w - 20) / 13);
    seats.push({ x, y: table.y - 10 }, { x, y: table.y + table.h + 10 });
  }
  for (let index = 0; index < 4; index += 1) {
    const y = table.y + 9 + index * ((table.h - 18) / 3);
    seats.push({ x: table.x - 10, y }, { x: table.x + table.w + 10, y });
  }
  return (
    <g>
      <rect x={table.x} y={table.y} width={table.w} height={table.h} rx={4} {...tableStyle} />
      <rect
        x={table.x + 18}
        y={table.y + 18}
        width={table.w - 36}
        height={table.h - 36}
        rx={2}
        fill="none"
        stroke="rgb(var(--color-olive))"
        strokeOpacity={0.3}
        strokeDasharray="3 3"
      />
      {seats.map((seat, index) => (
        <circle key={index} cx={seat.x} cy={seat.y} r={3.2} {...seatStyle} />
      ))}
    </g>
  );
}

function UShape() {
  const left = 84;
  const right = 316;
  const top = 78;
  const bottom = 222;
  const thickness = 16;
  const seats = [];
  for (let index = 0; index < 10; index += 1) {
    const y = top + 8 + index * ((bottom - top - 16) / 9);
    seats.push({ x: left - 10, y }, { x: right + 10, y });
  }
  for (let index = 0; index < 15; index += 1) {
    seats.push({ x: left + 8 + index * ((right - left - 16) / 14), y: bottom + 10 });
  }
  return (
    <g>
      <Stage label="Presenter" />
      <rect x={left} y={top} width={thickness} height={bottom - top} rx={2} {...tableStyle} />
      <rect x={right - thickness} y={top} width={thickness} height={bottom - top} rx={2} {...tableStyle} />
      <rect x={left} y={bottom - thickness} width={right - left} height={thickness} rx={2} {...tableStyle} />
      {seats.map((seat, index) => (
        <circle key={index} cx={seat.x} cy={seat.y} r={3.2} {...seatStyle} />
      ))}
    </g>
  );
}

function Cabaret() {
  const tables = [];
  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 5; col += 1) {
      tables.push({ cx: 56 + col * 72 + (row % 2 ? 0 : 0), cy: 92 + row * 62 });
    }
  }
  return (
    <g>
      <Stage />
      {tables.map((table) => (
        <RoundTable key={`${table.cx}-${table.cy}`} {...table} seats={6} arcOnly />
      ))}
    </g>
  );
}

const diagrams: Record<LayoutId, () => JSX.Element> = {
  standing: Standing,
  dining: Dining,
  theatre: Theatre,
  classroom: Classroom,
  boardroom: Boardroom,
  ushape: UShape,
  cabaret: Cabaret,
};

export default function LayoutDiagram({ layout, name }: { layout: LayoutId; name: string }) {
  const Diagram = diagrams[layout];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Illustrative ${name} layout diagram`}
      className="h-auto w-full"
    >
      <rect
        x={ROOM.x}
        y={ROOM.y}
        width={ROOM.w}
        height={ROOM.h}
        rx={3}
        fill="none"
        stroke="rgb(var(--color-olive))"
        strokeOpacity={0.35}
      />
      <AnimatePresence mode="wait" initial={false}>
        <motion.g key={layout} variants={panelSwap} initial="hidden" animate="visible" exit="exit">
          <Diagram />
        </motion.g>
      </AnimatePresence>
    </svg>
  );
}
