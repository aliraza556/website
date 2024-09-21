import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { PhotoOrText, Photo } from "@/lib/interfaces";

export const ParallaxScroll = ({
  photos,
  className,
}: {
  photos: PhotoOrText[];
  className?: string;
}) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(photos.length / 3);

  const firstPart = photos.slice(0, third);
  const secondPart = photos.slice(third, 2 * third);
  const thirdPart = photos.slice(2 * third);

  // Helper function to check if an entry is a photo or text
  const isPhoto = (photo: PhotoOrText): photo is Photo => {
    return (photo as Photo).file_name !== undefined;
  };

  const renderImageGrid = (
    photosPart: PhotoOrText[],
    translateValue: any,
    partIndex: number,
  ) =>
    photosPart.map((photo, idx) => {
      const { name, type } = photo;

      return (
        <motion.div
          className="relative group"
          style={{ y: translateValue }}
          key={`grid-${partIndex}-${idx}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          {type === "text" ? (
            <div className="flex flex-col items-center justify-center p-6 bg-slate-100 rounded-lg shadow-md relative">
              <Link
                href="/"
                className="absolute top-4 left-4 hover:underline font-extralight"
              >
                &larr; Back
              </Link>
              <br />
              <p className="text-lg font-light mb-4">{name}</p>
            </div>
          ) : isPhoto(photo) ? (
            <>
              <Image
                src={photo.image!}
                className="!m-0 gap-10 rounded-lg object-cover object-center !p-0 transition-all duration-500 ease-in-out drop-shadow-lg"
                height={400} // The aspect ratio will be maintained
                width={400} // The aspect ratio will be maintained
                alt="thumbnail"
                loading="lazy"
                layout="responsive"
                aria-label={name}
              />
            </>
          ) : null}
        </motion.div>
      );
    });

  return (
    <div
      className={cn(
        "h-[40rem] items-start overflow-y-auto hidescrollbar",
        className,
      )}
      ref={gridRef}
    >
      <div className="mx-auto grid grid-cols-3 items-start gap-5 pr-1 pb-20 pt-4.5">
        <div className="grid gap-10">
          {renderImageGrid(firstPart, translateFirst, 0)}
        </div>
        <div className="grid gap-10">
          {renderImageGrid(secondPart, translateSecond, 1)}
        </div>
        <div className="grid gap-10">
          {renderImageGrid(thirdPart, translateThird, 2)}
        </div>
      </div>
    </div>
  );
};
