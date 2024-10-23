import React, { useState } from "react";

type Props = {
  params: { id: string };
};

const Project = ({ params }: Props) => {
  const { id } = params;
  const [activeTab, setActiveTab] = useState("Board");

  return <div>Project</div>;
};

export default Project;
