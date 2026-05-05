import { intervalToDuration, parseISO } from "date-fns";
import { FC } from "react";

type Time = {
  dateKey: string;
  interval: number | undefined;
}

type Interval = 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds'

const TimeCalc: FC<Time> = ({dateKey, interval}) => {
  if (!interval) return <></>
  if (dateKey === 'seconds') return <></>

  return (
    <span>{interval} {dateKey} ago</span>
  )
}

const PostDate = ({ date }: { date: string }) => {
  const calcInterval = intervalToDuration({ start: parseISO(date), end: new Date() })
  const currentInterval = Object.keys(calcInterval)[0] as Interval;
  
  return (
    <i style={{display: "block"}}>
      <TimeCalc dateKey={currentInterval} interval={calcInterval[currentInterval]} />
    </i>
  )
};

export { PostDate }