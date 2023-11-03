import { NextApiRequest, NextApiResponse } from "next";
import { readFileSync } from "fs";

export const GET = (req: NextApiRequest, res: NextApiResponse) => {
  const filePath = "data/zoning-building-setback-overlay.geojson";
  const fileContent = readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileContent);

  data.features.forEach((feature: any) => {
    feature.geometry.coordinates[0].forEach((coordinate: any) => {
      coordinate.forEach((point: any) => {
        [point[0], point[1]] = [point[1], point[0]];
      });
    });
  });

  return Response.json(data);
};
