"use client";
import { useParams } from "next/navigation";
import React from "react";

const OutFitDetails = () => {
  const params = useParams();

  return <div>page: {params.id}</div>;
};

export default OutFitDetails;
