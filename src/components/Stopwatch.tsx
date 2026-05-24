import { useEffect, useRef, useState } from 'react'

const TICK_RATE = 10

function formatElapsed(totalMilliseconds: number) {
  const minutes = Math.floor(totalMilliseconds / 60000)
  const seconds = Math.floor((totalMilliseconds % 60000) / 1000)
  const centiseconds = Math.floor((totalMilliseconds % 1000) / 10)

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0',
  )}.${String(centiseconds).padStart(2, '0')}`
}

function Stopwatch() {
  const [elapsed, setElapsed] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState<number[]>([])
  const startedAtRef = useRef(0)

  useEffect(() => {
    if (!isRunning) {
      return
    }

    startedAtRef.current = Date.now() - elapsed
    const intervalId = window.setInterval(() => {
      setElapsed(Date.now() - startedAtRef.current)
    }, TICK_RATE)

    return () => window.clearInterval(intervalId)
  }, [elapsed, isRunning])

  const addLap = () => {
    if (elapsed === 0) {
      return
    }

    const previousTotal = laps.reduce((total, lap) => total + lap, 0)
    setLaps((current) => [elapsed - previousTotal, ...current])
  }

  const resetStopwatch = () => {
    setElapsed(0)
    setIsRunning(false)
    setLaps([])
  }

  return (
    <section
      className="time-card"
      id="stopwatch-panel"
      role="tabpanel"
      aria-labelledby="stopwatch-tab"
    >
      <h1>Stopwatch</h1>
      <div className="time-display" aria-live="polite">
        {formatElapsed(elapsed)}
      </div>

      <div className="button-row">
        <button
          type="button"
          className="primary-button"
          onClick={() => setIsRunning((current) => !current)}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          type="button"
          className="secondary-button"
          disabled={elapsed === 0}
          onClick={addLap}
        >
          Lap
        </button>
        <button
          type="button"
          className="secondary-button"
          onClick={resetStopwatch}
        >
          Reset
        </button>
      </div>

      {laps.length > 0 && (
        <ol className="lap-list" aria-label="Recorded laps">
          {laps.map((lap, index) => (
            <li key={`${lap}-${index}`}>
              <span>Lap {laps.length - index}</span>
              <strong>{formatElapsed(lap)}</strong>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}

export default Stopwatch
