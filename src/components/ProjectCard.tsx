import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from 'lucide-react';
import { RevealOnView } from "./RevealOnView";

type Props = {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  tags?: string[];
  href?: string;
  priority?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
  imageContainerClassName?: string;
  containerClassName?: string;
  revealDelay?: number;
};

// Server Component (no client hooks)
export default function ProjectCard({
  title = "Project title",
  subtitle = "Project subtitle", 
  imageSrc = "/placeholder.svg?height=720&width=1280",
  tags = ["Design", "Web"],
  href = "#",
  priority = false,
  gradientFrom = "#3b82f6", // Primary blue
  gradientTo = "#22c55e", // Accent green
  imageContainerClassName,
  containerClassName,
  revealDelay = 0,
}: Props) {
  const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ');

  return (
    <article className={cn("group relative", containerClassName)}>
      <RevealOnView
        delay={revealDelay}
        className="rounded-3xl border border-white/10 p-1 shadow-[0_10px_60px_-10px_rgba(0,0,0,0.6)] lg:h-full"
        style={{
          backgroundImage: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        }}
      >
        <div className="relative overflow-hidden rounded-[1.35rem] bg-black lg:h-full">
          {/* Image */}
          <div className={cn("relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-full", imageContainerClassName)}>
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt={title}
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              priority={priority}
              className="object-cover"
            />
            {/* Subtle vignette */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/30" />
          </div>

          {/* Top-left tags */}
          <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2">
            {tags.map((t) => (
              <div
                key={t}
                className="pointer-events-auto bg-black/50 text-white border border-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium"
              >
                {t}
              </div>
            ))}
          </div>

          {/* Bottom content */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold sm:text-xl text-white">{title}</h3>
                <p className="text-sm text-white/70">{subtitle}</p>
              </div>
              <Link
                href={href}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-medium backdrop-blur transition-colors hover:bg-white/20 self-start sm:self-auto text-white"
                aria-label={`Open case study: ${title}`}
              >
                Case study
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </RevealOnView>
    </article>
  );
}