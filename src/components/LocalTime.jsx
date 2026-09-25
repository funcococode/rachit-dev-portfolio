import { useEffect, useState } from 'react'
import { site } from '../data/site'

/** Live clock in the site owner's timezone, e.g. "09:41:07 IST". */
export default function LocalTime({ className = '' }) {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', {
      timeZone: site.timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date())
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <span className={`tabular-nums ${className}`}>{time} IST</span>
}
