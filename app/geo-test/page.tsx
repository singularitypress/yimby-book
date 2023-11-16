"use client";

import { Container } from "@components";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default () => {
  const Map = useMemo(
    () =>
      dynamic(() => import("@components").then((mod) => mod.Map), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  return (
    <Container>
      <h1 className="animate animate__in">Geo Test</h1>
      <div className="animate animate__in">
        <Map />
      </div>
    </Container>
  );
};
