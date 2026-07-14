import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  id,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <h2 id={id} className="text-h3 text-balance md:text-h2">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
