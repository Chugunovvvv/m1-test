import React, { memo, PropsWithChildren, useCallback } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  customId?: number;
  onCustomClick?: (id: number) => void;
}

const Button: React.FC<PropsWithChildren<Props>> = ({
  customId,
  onCustomClick,
  children,
  onClick,
  ...buttonProps
}) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onCustomClick && customId) {
        onCustomClick(customId);
      }

      if (onClick) {
        onClick(e);
      }
    },
    [customId, onCustomClick, onClick]
  );

  return (
    <button onClick={handleClick} {...buttonProps}>
      {children}
    </button>
  );
};

export default memo(Button);
