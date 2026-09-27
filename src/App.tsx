import { useEffect, useState } from 'react'
import { HomeScreen } from './components/HomeScreen'
import { StoryPlayer } from './components/StoryPlayer'
import { loadProgress, saveProgress, emptyProgress, type Progress, type RouteId } from './story/progress'
import './App.css'
import './components/phone/messaging.css'
import './components/phone/ui-refresh.css'

function App() {
  const [progress, setProgress] = useState<Progress>(loadProgress)
  const [route, setRoute] = useState<RouteId | null>(null)

  useEffect(() => { saveProgress(progress) }, [progress])
  useEffect(() => { window.scrollTo(0, 0) }, [route])

  function complete(id: RouteId) {
    setProgress(current => ({
      ...current,
      [`${id}Completed`]: true,
      firstRead: current.firstRead ?? (id === 'jack' ? null : id),
    }))
  }

  function reset() {
    setRoute(null)
    setProgress(emptyProgress)
  }

  return route
    ? <StoryPlayer key={route} route={route} onExit={() => setRoute(null)} onComplete={() => complete(route)} />
    : <HomeScreen progress={progress} onSelect={setRoute} onReset={reset} />
}

export default App
