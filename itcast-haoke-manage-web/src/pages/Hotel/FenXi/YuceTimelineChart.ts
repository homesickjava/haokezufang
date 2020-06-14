import * as React from 'react';
export interface ITimelineChartProps {
  data: Array<{
    x: string;
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

export default class YuceTimelineChart extends React.Component<ITimelineChartProps, any> {}
