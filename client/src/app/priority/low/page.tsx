import React from "react";
import PriorityPage from "../reusablePriorityPage";
import { Priority } from "@/state/api";

const Low = () => {
  return <PriorityPage priority={Priority.Low} />;
};

export default Low;
