import type { PhoneConfig } from './types'
const contact = (id: string, name: string, initials: string, color: string, photo?: string) => ({ id, name, initials, color, photo })
export const phones: Record<PhoneConfig['id'], PhoneConfig> = {
  a: { id:'a', label:'Reina', role:'Master', battery:91, signalBars:2, wifi:true, muted:true, unreadMessages:2, unreadVoicemails:0, flashlight:false, wallpaper:'#d8dce4', 
    contacts:{ b:{...contact('b','KyunYong','KY','#918ac8'),groupPhoto:'images/avatars/kyunyong.jpg'}, 
               tom:contact('tom','Tom','T','#648f85'), 
               starr:contact('starr','Mr. Starr','MS','#8e8392'), 
               james:contact('james','James','J','#8a9aad'), 
               eddie:contact('eddie','Eddie','E','#bb907a') }, 
    threads:[
      {id:'a-starr',app:'messages',title:'Mr. Starr',participants:['a','starr'],preview:'Checking in.',time:'9:41'},
      {id:'a-tom',app:'messages',title:'Tom',participants:['a','tom'],preview:'Grocery run?',time:'9:22'},
      {id:'a-b',app:'messenger',title:'KyunYong',participants:['a','b'],preview:'Open to read',time:'Yesterday',pinned:true,photo:'images/avatars/kyunyong.jpg'},
      {id:'a-soldiers',app:'messages',title:"Starr's Child Soldiers",participants:['a','b','james','eddie'],preview:'Group chat',time:'Yesterday',group:true},
      {id:'a-family',app:'messages',title:'Starry Night Family',participants:['a','b','starr'],preview:'Group chat',time:'Mon',group:true},
    ] },
  b: { id:'b', label:'KyunYong', role:'Controller', battery:12, signalBars:4, wifi:true, muted:false, unreadMessages:147, unreadVoicemails:8, flashlight:false, wallpaper:'#cfc6d7', 
    contacts:{ a:{...contact('a','Reina','R','#738dab'),groupPhoto:'images/avatars/reina.jpg'}, 
               tom:contact('tom','Tom','T','#648f85'), 
               starr:contact('starr','daddy ⭐️','⭐','#b09b75'), 
               james:contact('james','James','J','#8a9aad'), 
               eddie:contact('eddie','Eddie','E','#bb907a'), 
               julia:contact('julia','Julia','J','#648f85'), }, 
    threads:[
      {id:'b-a',app:'messenger',title:'Reina',participants:['b','a'],preview:'Drafts (3)',time:'Now',unread:4,pinned:true,photo:'images/avatars/reina.jpg'},
      {id:'b-soldiers',app:'messages',title:"Starr's Child Soldiers",participants:['b','a','james','eddie'],preview:'who named this chat',time:'9:38',unread:84,group:true},
      {id:'b-family',app:'messages',title:'Starry Night Family',participants:['b','a','starr'],preview:'Please answer.',time:'9:13',unread:12,group:true},
      {id:'b-starr',app:'messages',title:'daddy ⭐️',participants:['b','starr'],preview:'Call me.',time:'8:44',unread:7},
      {id:'b-julia',app:'messages',title:'julia',participants:['b','julia'],preview:'bruh',time:'16:44',unread:7},
      {id:'b-tom',app:'messages',title:'Tom (probably groceries)',participants:['b','tom'],preview:'Trader Joe’s?',time:'Yesterday',unread:40},
    ] },
  jack: { id:'jack', label:'Jack 🎃', role:'Bloopers — read last', battery:64, signalBars:3, wifi:true, muted:false, unreadMessages:31, unreadVoicemails:66, flashlight:true, wallpaper:'#cfbf9f', contacts:{ unknown:contact('unknown','Unknown','?','#646b73') }, threads:[
    {id:'jack-unknown',app:'messages',title:'Unknown',participants:['jack','unknown'],preview:'New message',time:'Now',unread:1,unknown:true},
  ] },
}
