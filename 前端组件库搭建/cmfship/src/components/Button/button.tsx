import React from 'react';
import classNames from 'classnames';

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

interface BaseButtonProps {
  className?: string,
  disabled?: boolean,
  size?: ButtonSize,
  btnType?: ButtonType, // type本身是button上的属性，所以不用type，用btnType
  children: React.ReactNode,
  href?: string
}

// |是联合类型；&是交叉类型
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps &  AnchorButtonProps>;

const Button: React.FC<ButtonProps> = ({btnType=ButtonType.Default, disabled=false, size, children, href, className, ...restProps}) => {
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': btnType === ButtonType.Link && disabled
  })
  if (btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href} {...restProps}>{children}</a>
    )
  } else {
    return (
      // a链接的disabled属性是添加在classname上的，button本身就有disabled属性，所以不需要添加在classname上
      <button className={classes} disabled={disabled} {...restProps}>{children}</button>
    )
  }
}

export default Button