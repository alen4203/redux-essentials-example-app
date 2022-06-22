import { parseISO, formatDistanceToNow } from 'date-fns'

export default function TimeAgo({ timestamp }) {
  return (
    <span title={timestamp}>
      &nbsp;&nbsp;
      <i>
        {timestamp &&
          formatDistanceToNow(parseISO(timestamp), { addSuffix: true })}
      </i>
    </span>
  )
}
