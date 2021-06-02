import React from "react";

interface LayoutProps {
  leftContent?: React.FC;
  rightContent?: React.FC;
}

export const Layout: React.FC<LayoutProps> = ({
  leftContent,
  rightContent,
  children,
}) => {
  return (
    <div className="w-full h-full bg-iconBlue ">
      <div className="ml-8">{children}</div>
    </div>
  );
};
