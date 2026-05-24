import { useState } from 'react'
import './App.css'
import Timer from './components/Timer'
import Stopwatch from './components/Stopwatch'

type ActiveTab = 'timer' | 'stopwatch'

const tabs: { id: ActiveTab; label: string }[] = [
  { id: 'timer', label: 'Timer' },
  { id: 'stopwatch', label: 'Stopwatch' },
]

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('timer')

  return (
    <main className="app-shell">
      <section className="time-app">
        <div className="tab-panel">
          <div className="tabs" role="tablist" aria-label="Time tool">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={activeTab === tab.id ? 'tab active' : 'tab'}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`${tab.id}-panel`}
                id={`${tab.id}-tab`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="panel-surface">
            {activeTab === 'timer' ? <Timer /> : <Stopwatch />}
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
