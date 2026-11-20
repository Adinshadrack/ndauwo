"use client";

import Image from "next/image";
import { motion } from "motion/react";

export function PolaroidCollage() {
  return (
    <div className="relative flex w-full items-center justify-center">
      {/* Increased max-width to 900px to make it larger on desktop */}
      <div className="relative w-full max-w-[900px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 15,
          }}
          // Added md:scale-110 to boost the size slightly on desktop 
          // while keeping mobile at 100% so it fills the width
          className="w-full md:scale-110 origin-center"
        >
          <Image
            src="/images/team/polaroid-collage.png"
            alt="Ndauwo Safaris Team and Wildlife"
            width={940}
            height={691}
            className="h-auto w-full object-contain drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </div>
  );
}