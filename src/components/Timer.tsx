import { useEffect, useState } from 'react'

const SECOND = 1000
const DEFAULT_SECONDS = 5 * 60

function formatTime(totalSeconds: number) {
  const safeSeconds = Math.max(0, totalSeconds)
  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)
  const seconds = safeSeconds % 60

  return [hours, minutes, seconds]
    .map((unit) => String(unit).padStart(2, '0'))
    .join(':')
}

function clampTimeUnit(value: number, max: number) {
  if (Number.isNaN(value)) {
    return 0
  }

  return Math.min(Math.max(value, 0), max)
}

function Timer() {
  const [duration, setDuration] = useState(DEFAULT_SECONDS)
  const [remaining, setRemaining] = useState(DEFAULT_SECONDS)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) {
      return
    }

    const intervalId = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          setIsRunning(false)
          return 0
        }

        return current - 1
      })
    }, SECOND)

    return () => window.clearInterval(intervalId)
  }, [isRunning])

  const updateDuration = (nextDuration: number) => {
    const safeDuration = Math.max(0, nextDuration)
    setDuration(safeDuration)
    setRemaining(safeDuration)
    setIsRunning(false)
  }

  const updateUnit = (unit: 'hours' | 'minutes' | 'seconds', value: number) => {
    const hours = Math.floor(duration / 3600)
    const minutes = Math.floor((duration % 3600) / 60)
    const seconds = duration % 60
    const next = {
      hours,
      minutes,
      seconds,
      [unit]: clampTimeUnit(value, unit === 'hours' ? 23 : 59),
    }

    updateDuration(next.hours * 3600 + next.minutes * 60 + next.seconds)
  }

  const resetTimer = () => {
    setRemaining(duration)
    setIsRunning(false)
  }

  return (
    <section
      className="time-card"
      id="timer-panel"
      role="tabpanel"
      aria-labelledby="timer-tab"
    >
      <h1>Timer</h1>
      <div className="time-display" aria-live="polite">
        {formatTime(remaining)}
      </div>

      <div className="input-grid" aria-label="Set timer duration">
        <label>
          <span>H</span>
          <input
            type="number"
            min="0"
            max="23"
            value={Math.floor(duration / 3600)}
            onChange={(event) =>
              updateUnit('hours', event.currentTarget.valueAsNumber)
            }
          />
        </label>
        <label>
          <span>M</span>
          <input
            type="number"
            min="0"
            max="59"
            value={Math.floor((duration % 3600) / 60)}
            onChange={(event) =>
              updateUnit('minutes', event.currentTarget.valueAsNumber)
            }
          />
        </label>
        <label>
          <span>S</span>
          <input
            type="number"
            min="0"
            max="59"
            value={duration % 60}
            onChange={(event) =>
              updateUnit('seconds', event.currentTarget.valueAsNumber)
            }
          />
        </label>
      </div>

      <div className="button-row">
        <button
          type="button"
          className="primary-button"
          disabled={duration === 0 || remaining === 0}
          onClick={() => setIsRunning((current) => !current)}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button type="button" className="secondary-button" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </section>
  )
}

export default Timer
