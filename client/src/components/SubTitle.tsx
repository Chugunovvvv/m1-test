import React, { PropsWithChildren } from "react";

const SubTitle: React.FC<PropsWithChildren> = ({ children }) => {
  return <h2 className={"list-subtitle"}>{children}</h2>;
};

export default SubTitle;
