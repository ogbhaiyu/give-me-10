"use client";

import { motion, useReducedMotion } from "framer-motion";
import { money } from "@/config";

const BILLS = [
  { x: "6%", y: "18%", size: 64, rotate: -14, delay: 0 },
  { x: "84%", y: "12%", size: 44, rotate: 12, delay: 0.4 },
  { x: "14%", y: "70%", size: 38, rotate: 9, delay: 0.8 },
  { x: "78%", y: "66%", size: 72, rotate: -8, delay: 1.2 },
  { x: "44%", y: "8%", size: 30, rotate: 18, delay: 0.6 },
  { x: "92%", y: "44%", size: 34, rotate: -19, delay: 1.6 },
  { x: "3%", y: "44%", size: 28, rotate: 22, delay: 1 },
  { x: "60%", y: "82%", size: 46, rotate: -11, delay: 1.4 },
];

export function FloatingBills() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {BILLS.map((bill, index) => (
        <motion.span
          key={index}
          className="absolute font-mono font-medium text-emerald-500/25 select-none dark:text-emerald-400/25"
          style={{ left: bill.x, top: bill.y, fontSize: bill.size }}
          initial={{ opacity: 0, y: 20, rotate: bill.rotate }}
          animate={
            reduceMotion
              ? { opacity: 1, y: 0, rotate: bill.rotate }
              : {
                  opacity: [0, 1, 1, 0.7, 1],
                  y: [10, -14, 4, -18, 10],
                  rotate: [
                    bill.rotate,
                    bill.rotate - 6,
                    bill.rotate + 4,
                    bill.rotate - 3,
                    bill.rotate,
                  ],
                }
          }
          transition={{
            duration: 9,
            delay: bill.delay,
            repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {money}
        </motion.span>
      ))}
    </div>
  );
}
