import * as React from 'react';
export interface ITimelineChartProps {
  data: Array<{
    x: number;
    y1: number;
    y2?: number;
    y3?: number;
    y4?: number;
  }>;
  titleMap: { y1: string; y2?: string ; y3?: string; y4?: string};
  padding?: [number, number, number, number];
  height?: number;
  style?: React.CSSProperties;
}

export default class HotelTimelineChart extends React.Component<ITimelineChartProps, any> {}
