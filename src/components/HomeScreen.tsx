import { canOpen, type Progress, type RouteId } from '../story/progress'
import { phones } from '../story/phoneConfigs'
import type { CSSProperties } from 'react'
export function HomeScreen({progress,onSelect,onReset}:{progress:Progress;onSelect:(route:RouteId)=>void;onReset:()=>void}) {
  const photo = `${import.meta.env.BASE_URL}images/landing/background.jpg`
  return <main className="landing landing--photo" style={{ '--landing-photo': `url("${photo}")` } as CSSProperties}>
    <div className="landing__inner">
      <div className="eyebrow">ARE WE TOO RELIANT ON OUR PHONES?</div>
      <h1>Gaslight, Gatekeep, Glitch</h1>
      <p className="date">October 31, 2026</p>
      <p className="intro">Two girls. Two phones. Two versions of the same night. Choose where to begin.</p>
      <div className="route-grid">
        {(['b','a','jack'] as RouteId[]).map(id => {
          const phone=phones[id], unlocked=canOpen(id,progress), done=progress[`${id}Completed`]
          return <button className={`route-card route-card--${id}`} type="button" key={id} disabled={!unlocked} onClick={()=>onSelect(id)} aria-label={`${phone.label}, ${phone.role}${unlocked?'':' locked until Reina and KyunYong are complete'}`}>
            <span className="route-card__top"><span>{id==='jack'?'POST-CREDITS':'PERSPECTIVE'}</span><span>{done?'✓ READ':unlocked?'↗':'⌁ LOCKED'}</span></span>
            <span className="route-card__letter">{phone.label}</span><span className="route-card__role">{phone.role}</span>
          </button>
        })}
      </div>
      <p className="progress-note">{progress.firstRead ? `${phones[progress.firstRead].label} was read first.` : "Reina's and KyunYong's can be read in either order."} {progress.aCompleted&&progress.bCompleted?'Jack is unlocked.':'Finish both to unlock Jack.'}</p>
      <button type="button" className="reset-button" onClick={onReset}>Reset story progress</button>
    </div>
  </main>
}
