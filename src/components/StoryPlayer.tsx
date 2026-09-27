import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getView, stories } from '../story/engine'
import { phones } from '../story/phoneConfigs'
import type { RouteId } from '../story/types'
import { PhoneShell } from './phone/PhoneShell'
export function StoryPlayer({route,onExit,onComplete}:{route:RouteId;onExit:()=>void;onComplete:()=>void}) {
  const story=stories[route], phone=phones[route]
  const [index,setIndex]=useState(0)
  const beatRefs=useRef<(HTMLElement|null)[]>([])
  const raf=useRef(0)
  const completed=useRef(false)
  const update=useCallback(()=>{
    cancelAnimationFrame(raf.current)
    raf.current=requestAnimationFrame(()=>{
      let next=0
      const threshold=window.innerHeight*.72
      beatRefs.current.forEach((node,i)=>{ if(node && node.getBoundingClientRect().top<=threshold) next=i })
      setIndex(next)
    })
  },[])
  useEffect(()=>{
    window.scrollTo(0,0)
    window.addEventListener('scroll',update,{passive:true})
    window.addEventListener('resize',update)
    update()
    return ()=>{window.removeEventListener('scroll',update);window.removeEventListener('resize',update);cancelAnimationFrame(raf.current)}
  },[update])
  useEffect(()=>{ if(story.events[index]?.type==='complete'&&!completed.current){completed.current=true;onComplete()} },[index,onComplete,story.events])
  const view=useMemo(()=>getView(story.events,index),[story.events,index])
  return <main className="story-page">
    <div className="story-top"><button type="button" onClick={onExit}>← All perspectives</button><span>{phone.label} · {index+1}/{story.events.length}</span></div>
    <div className="story-stage"><PhoneShell phone={phone} view={view} beatId={story.events[index].id} complete={story.events[index].type==='complete'} onExit={onExit}/></div>
    <div className="beat-track" aria-label={`${phone.label} story beats`}>
      {story.events.map((event,i)=><section className="beat" ref={node=>{beatRefs.current[i]=node}} key={event.id} aria-current={index===i?'step':undefined}><div className={`beat__cue ${index===i?'beat__cue--active':''}`}><span>{String(i+1).padStart(2,'0')}</span>{event.cue}</div></section>)}
    </div>
  </main>
}
