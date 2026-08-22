import type { CSSProperties, ImgHTMLAttributes } from 'react';

type StaticImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
};

export default function StaticImage({
  src,
  fill,
  priority,
  quality: _quality,
  style,
  ...props
}: StaticImageProps) {
  const resolvedSrc = src.startsWith('/')
    ? `${import.meta.env.BASE_URL}${src.slice(1)}`
    : src;
  const fillStyle: CSSProperties | undefined = fill
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%', ...style }
    : style;

  return (
    <img
      {...props}
      src={resolvedSrc}
      style={fillStyle}
      loading={priority ? 'eager' : props.loading ?? 'lazy'}
      decoding="async"
    />
  );
}
