"use client";

import dynamic from "next/dynamic";
import React from "react";
import useSWR from "swr";

const DynamicMap = dynamic(
  () => import("./dynamic-map").then((mod) => mod.DynamicMap),
  {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  }
);

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export const Map = () => {
  const { data, error } = useSWR("/api/zoning-rooming-house", fetcher);

  if (error) {
    return <div>Failed to load data</div>;
  }

  if (!data) {
    return <div>Loading data...</div>;
  }

  return <DynamicMap data={data} />;
};
