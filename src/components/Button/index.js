import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
const cx = classNames.bind(styles);

function Button({
  to,
  href,
  primary = false,
  outline = false,
  small = false,
  large = false,
  disabled = false,
  rounded = false,
  text = false,
  leftIcon,
  rightIcon,
  children,
  onClick,
  className,
  ...passProps
}) {
  let Comp = 'button';
  const props = {
    onClick,
    ...passProps,
  };
  if (to) {
    Comp = Link;
    props.to = to;
  } else if (href) {
    Comp = 'a';
    props.href = href;
  }
  // Remove event listener when btn is disabled
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof key === 'function') {
        delete props[key];
      }
    });
  }
  const classes = cx('wrapper', {
    [className]: className,
    primary,
    outline,
    small,
    large,
    disabled,
    rounded,
    text,
  });
  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={cx('left-icon')}>{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className={cx('right-icon')}>{rightIcon}</span>}
    </Comp>
  );
}

export default Button;
