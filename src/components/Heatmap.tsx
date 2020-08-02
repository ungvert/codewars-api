import React from "react";
import { Group } from "@vx/group";
import { scaleLinear } from "@vx/scale";
import { HeatmapRect } from "@vx/heatmap";
import { useTheme } from "@material-ui/core/styles";

export type HeatmapProps = {
  width: number;
  height: number;
  binData: Bins[];
  margin?: { top: number; right: number; bottom: number; left: number };
  separation?: number;
  events?: boolean;
};

const defaultMargin = { top: 10, left: 0, right: 0, bottom: 10 };

function Heatmap({
  width,
  height,
  binData,
  events = false,
  margin = defaultMargin,
  separation = 0,
}: HeatmapProps) {
  const theme = useTheme();

  const cool1 = theme.palette.grey[50];
  const cool2 = theme.palette.primary.main;
  const background = theme.palette.background.default;
  type CountFunction = (idx: number, number: number) => number;
  type BinFunction = (idx: number, number?: number) => number;

  function max<Datum>(data: Datum[], value: (d: Datum) => number): number {
    return Math.max(...data.map(value));
  }

  // accessors
  const bins = (d: Bins) => d.bins;
  const count = (d: Bin) => d.count;

  const colorMax = max(binData, (d) => max(bins(d), count));
  const bucketSizeMax = max(binData, (d) => bins(d).length);

  // scales
  const xScale = scaleLinear<number>({
    domain: [0, binData.length],
  });
  const yScale = scaleLinear<number>({
    domain: [0, bucketSizeMax],
  });
  const rectColorScale = scaleLinear<string>({
    range: [cool1, cool2],
    domain: [0, colorMax],
  });

  // bounds
  const size =
    width > margin.left + margin.right
      ? width - margin.left - margin.right - separation
      : width;
  const xMax = size;
  const yMax = height - margin.bottom - margin.top;

  const binWidth = 13;

  xScale.range([0, xMax]);
  yScale.range([yMax, 0]);

  return width < 10 ? null : (
    // <div>
    <svg
      width={width}
      height={height}
      //   style={{ transform: "translateX(40px)" }}
    >
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        //   ry={2}
        rx={2}
        ry={2}
        fill={background}
      />

      <Group>
        <HeatmapRect
          data={binData}
          xScale={xScale}
          yScale={yScale}
          colorScale={rectColorScale}
          //   opacityScale={opacityScale}
          binWidth={binWidth}
          binHeight={binWidth}
          gap={3}
        >
          {(heatmap) =>
            heatmap.map((heatmapBins) =>
              heatmapBins.map((bin) => (
                <rect
                  key={`heatmap-rect-${bin.row}-${bin.column}`}
                  className="vx-heatmap-rect"
                  width={bin.width}
                  height={bin.height}
                  x={bin.x}
                  y={bin.y}
                  fill={bin.color}
                  // fillOpacity={bin.opacity}
                  rx={2}
                  ry={2}
                  style={{
                    outline: "1px solid rgba(27, 31, 35, 0.08)",
                    shapeRendering: "geometricPrecision",
                    outlineOffset: "-1px",
                  }}
                  onClick={() => {
                    if (!events) return;
                    const { row, column } = bin;
                    alert(JSON.stringify({ row, column, bin: bin.bin }));
                  }}
                />
              ))
            )
          }
        </HeatmapRect>
      </Group>
    </svg>
    // </div>
  );
}
export default Heatmap;
