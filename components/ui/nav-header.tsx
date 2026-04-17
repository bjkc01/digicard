"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export type NavHeaderItem = {
  href: string;
  label: string;
};

type CursorState = {
  left: number;
  width: number;
  opacity: number;
};

type NavHeaderProps = {
  items: readonly NavHeaderItem[];
  className?: string;
};

type TabProps = {
  href: string;
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<CursorState>>;
};

function NavHeader({ items, className }: NavHeaderProps) {
  const [position, setPosition] = useState<CursorState>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <nav aria-label="Section navigation" className={className}>
      <ul
        className="relative mx-auto flex w-fit p-1"
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setPosition((previous) => ({ ...previous, opacity: 0 }));
          }
        }}
        onMouseLeave={() => setPosition((previous) => ({ ...previous, opacity: 0 }))}
      >
        {items.map((item) => (
          <Tab key={item.href} href={item.href} setPosition={setPosition}>
            {item.label}
          </Tab>
        ))}

        <Cursor position={position} />
      </ul>
    </nav>
  );
}

function Tab({ children, href, setPosition }: TabProps) {
  const ref = useRef<HTMLLIElement>(null);

  const updatePosition = () => {
    if (!ref.current) {
      return;
    }

    const { width } = ref.current.getBoundingClientRect();

    setPosition({
      width,
      opacity: 1,
      left: ref.current.offsetLeft,
    });
  };

  return (
    <li ref={ref} onMouseEnter={updatePosition} className="relative z-10">
      <a
        href={href}
        onFocus={updatePosition}
        className="block cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-white/70 transition-colors duration-200 hover:text-white md:px-5 md:py-3"
      >
        {children}
      </a>
    </li>
  );
}

function Cursor({ position }: { position: CursorState }) {
  return (
    <motion.li
      aria-hidden="true"
      animate={position}
      transition={{ type: "spring", stiffness: 360, damping: 30 }}
      className="absolute inset-y-1 z-0 rounded-full bg-white/15"
    />
  );
}

export default NavHeader;
