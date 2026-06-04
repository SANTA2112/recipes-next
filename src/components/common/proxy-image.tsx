import type { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'img'> {}

export const ProxyImage = (props: Props) => {
  const { src = '', alt, ...rest } = props;
  return <img {...rest} src={`/api/image-proxy?url=${encodeURIComponent(src as string)}`} alt={alt} loading="lazy" />;
};
