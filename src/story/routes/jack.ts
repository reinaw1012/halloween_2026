import type { StoryRoute } from '../types'
export const jackStory: StoryRoute = { id:'jack', events:[
  {id:'j-01',type:'openApp',app:'messages',cue:'Open Messages'},
  {id:'j-02',type:'openThread',threadId:'jack-unknown',cue:'Open Unknown'},
  {id:'j-03',type:'message',cue:'A message appears',message:{id:'j-m1',threadId:'jack-unknown',sender:'unknown',text:'Is this Jack?',timestamp:'11:59',app:'messages',status:'delivered'}},
  {id:'j-04',type:'message',cue:'Jack replies',message:{id:'j-m2',threadId:'jack-unknown',sender:'jack',text:'WHO IS THIS',timestamp:'12:00',app:'messages',status:'not-delivered'}},
  {id:'j-05',type:'pause',cue:'No delivery'},
  {id:'j-06',type:'message',cue:'The sender continues',message:{id:'j-m3',threadId:'jack-unknown',sender:'unknown',text:'That answered my question.',timestamp:'12:01',app:'messages',status:'delivered'}},
  {id:'j-07',type:'complete',cue:'End of Jack’s demo'},
] }
