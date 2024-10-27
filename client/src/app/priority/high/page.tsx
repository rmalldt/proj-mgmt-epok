import React from "react";
import PriorityPage from "../reusablePriorityPage";
import { Priority } from "@/state/api";

const High = () => {
  return <PriorityPage priority={Priority.High} />;
};

export default High;
