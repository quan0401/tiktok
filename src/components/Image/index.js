import classNames from 'classnames';
import styles from './Image.module.scss';
import { forwardRef, useState } from 'react';
import images from '~/assets/images';

function Image({ src, className, alt, fallback: customFallback = images.noImage, ...props }, ref) {
  const [fallback, setFallback] = useState('');
  const handleError = () => {
    setFallback(customFallback);
  };

  return (
    <img
      className={classNames(styles.wrapper, className)}
      ref={ref}
      src={src || fallback}
      alt={alt}
      {...props}
      onError={handleError}
    />
  );
}
export default forwardRef(Image);
