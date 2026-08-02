"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export type CaseCarouselItem = {
  slug: string;
  title: string;
  description: string;
  image?: { src: string; alt: string };
};

type Props = {
  items: CaseCarouselItem[];
  header: ReactNode;
  viewLabel: string;
  prevLabel: string;
  nextLabel: string;
  goToLabel: string;
};

export default function CaseStudiesCarousel({
  items,
  header,
  viewLabel,
  prevLabel,
  nextLabel,
  goToLabel,
}: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(media.matches);
    const onChange = () => setReduceMotion(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const update = () => {
      const maxScroll = root.scrollWidth - root.clientWidth;
      setCanPrev(root.scrollLeft > 4);
      setCanNext(root.scrollLeft < maxScroll - 4);

      const cards = Array.from(
        root.querySelectorAll<HTMLElement>("[data-case-card]"),
      );
      if (cards.length === 0) return;

      const midpoint = root.scrollLeft + root.clientWidth / 2;
      let closest = 0;
      let closestDist = Infinity;
      cards.forEach((card, index) => {
        const center = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(center - midpoint);
        if (dist < closestDist) {
          closestDist = dist;
          closest = index;
        }
      });
      setActiveIndex(closest);
    };

    update();
    root.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      root.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items.length]);

  const scrollByDir = (dir: -1 | 1) => {
    const root = scrollerRef.current;
    if (!root) return;
    const card = root.querySelector<HTMLElement>("[data-case-card]");
    const gap = 24;
    const step = (card?.offsetWidth ?? 320) + gap;
    root.scrollBy({
      left: dir * step,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const scrollToIndex = (index: number) => {
    const root = scrollerRef.current;
    if (!root) return;
    const card = root.querySelectorAll<HTMLElement>("[data-case-card]")[index];
    card?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      inline: "start",
      block: "nearest",
    });
  };

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">{header}</div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByDir(-1)}
            disabled={!canPrev}
            aria-label={prevLabel}
            className="inline-flex size-10 items-center justify-center rounded border border-light-gray bg-white text-near-black transition-colors hover:border-near-black disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronLeft className="size-5" strokeWidth={1.75} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollByDir(1)}
            disabled={!canNext}
            aria-label={nextLabel}
            className="inline-flex size-10 items-center justify-center rounded border border-light-gray bg-white text-near-black transition-colors hover:border-near-black disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronRight className="size-5" strokeWidth={1.75} aria-hidden />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={viewLabel}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollByDir(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollByDir(1);
          }
        }}
        className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-near-black [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/cases/${item.slug}`}
            data-case-card
            className="group flex w-[min(100%,20rem)] shrink-0 snap-start flex-col overflow-hidden rounded-lg border border-light-gray bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md sm:w-[min(100%,22rem)] md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-light-gray/60">
              {item.image ? (
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-wider text-medium-gray">
                  Focus First
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-lg font-semibold text-near-black">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-dark-gray">
                {item.description}
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-accent">
                {viewLabel}
                <span className="ml-1 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {items.map((item, index) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => scrollToIndex(index)}
            aria-label={`${goToLabel} ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            className={`h-2 rounded-full transition-all ${
              index === activeIndex
                ? "w-6 bg-accent"
                : "w-2 bg-medium-gray/40 hover:bg-medium-gray"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
