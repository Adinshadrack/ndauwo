import Image, { ImageProps } from "next/image";

type ResponsiveImageProps = ImageProps & {
  className?: string;
};

export function ResponsiveImage({
  className = "",
  ...props
}: ResponsiveImageProps) {
  return (
    <Image
      {...props}
      className={`object-cover ${className}`}
    />
  );
}