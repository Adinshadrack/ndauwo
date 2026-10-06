import Image, { ImageProps } from "next/image";

type ImageVariant =
  | "hero"
  | "tour"
  | "destination"
  | "blog"
  | "gallery"
  | "avatar"
  | "logo";

interface CmsImageProps extends Omit<ImageProps, "fill"> {
  variant?: ImageVariant;
  fill?: boolean;
}

const variantClasses: Record<ImageVariant, string> = {
  hero: "object-cover object-center",
  tour: "object-cover object-center",
  destination: "object-cover object-center",
  blog: "object-cover object-center",
  gallery: "object-cover object-center",
  avatar: "object-cover object-center",
  logo: "object-contain object-center",
};

export function CmsImage({
  variant = "tour",
  fill = true,
  className = "",
  ...props
}: CmsImageProps) {
  return (
    <Image
      {...props}
      fill={fill}
      className={`${variantClasses[variant]} ${className}`}
    />
  );
}