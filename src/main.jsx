import React, {useMemo, useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';

const seed = [
  {id:1, direction:'in', person:'Abel', amount:2500, detail:'Lunch refund · Today'},
  {id:2, direction:'out', person:'Sara', amount:800, detail:'Coffee & taxi · Yesterday'},
  {id:3, direction:'in', person:'Miki', amount:4000, detail:'Transfer · Aug 18'},
];

function Logo({large=false}) {
  return <img className={large ? 'logo logo-large' : 'logo'} src="/api/logo" alt="Dire Pay" />;
}

function Activity({items}) {
  return <div className="card activity-card">{items.map(item => (
    <div className="activity-row" key={item.id}>
      <div className="initials">{item.person.slice(0,2).toUpperCase()}</div>
      <div className="activity-copy"><strong>{item.direction === 'in' ? 'From' : 'To'} {item.person}</strong><span>{item.detail}</span></div>
      <strong className={item.direction === 'in' ? 'amount incoming' : 'amount'}>{item.direction === 'in' ? '+' : '−'}{item.amount.toLocaleString()} ETB</strong>
    </div>
  ))}</div>;
}

function App(){
  const [tab,setTab]=useState('home');
  const [balance,setBalance]=useState(10250);
  const [activity,setActivity]=useState(seed);
  const [flow,setFlow]=useState(null);
  const [recipient,setRecipient]=useState('');
  const [amount,setAmount]=useState('');
  const [note,setNote]=useState('');
  const parsed = Number(amount || 0);
  const canSend = recipient.trim() && parsed > 0 && parsed <= balance;
  const title = useMemo(()=> tab === 'home' ? 'Dire Pay' : tab[0].toUpperCase()+tab.slice(1),[tab]);

  function nav(next){setTab(next);setFlow(null);window.scrollTo(0,0)}
  function reset(){setRecipient('');setAmount('');setNote('');setFlow(null)}
  function send(){
    if(!canSend) return;
    setBalance(v=>v-parsed);
    setActivity(items=>[{id:Date.now(),direction:'out',person:recipient.trim(),amount:parsed,detail:(note.trim() || 'Dire Pay')+' · Just now'},...items]);
    setFlow('sent');
  }

  return <div className="app-shell">
    <header className="topbar">
      <button className="brand-button" onClick={()=>nav('home')} aria-label="Dire Pay home"><Logo/><span>{title}</span></button>
      <button className="avatar" onClick={()=>nav('profile')} aria-label="Profile">HY</button>
    </header>

    {tab==='home' && <main className="page home-page">
      <Logo large/>
      <div className="eyebrow">Available balance</div>
      <div className="balance">{balance.toLocaleString()} <small>ETB</small></div>
      <span className="demo-badge">DEMO MONEY</span>
      <div className="primary-actions"><button className="primary" onClick={()=>{reset();setFlow('send')}}>↑ Send</button><button className="secondary" onClick={()=>{reset();setFlow('request')}}>↓ Request</button></div>
      <h2>Recent activity</h2><Activity items={activity.slice(0,4)}/>
      <p className="notice">Pilot mode. These are simulated ETB balances and transactions; no real funds are held or moved.</p>
    </main>}

    {tab==='activity' && <main className="page"><h1>Activity</h1><Activity items={activity}/></main>}

    {tab==='card' && <main className="page"><div className="section-heading"><h1>Dire Card</h1><span className="demo-badge">PREVIEW</span></div><div className="dire-card"><strong>DIRE PAY</strong><div className="card-number">•••• •••• •••• 4821</div><div className="card-footer"><span>HALLE</span><span>12/30</span></div></div><p className="notice">Card issuance will require a licensed issuer or bank and card-network partnership.</p></main>}

    {tab==='profile' && <main className="page"><h1>Profile & security</h1><div className="card profile-card"><div className="initials profile-initials">HY</div><div><strong>Halle ✓</strong><span>+251 911 234 567 · $halle</span></div></div><div className="card settings"><div><strong>Biometric security</strong><span>Face ID / fingerprint</span></div><b>On</b></div><div className="card settings"><div><strong>Transaction alerts</strong><span>Instant payment notifications</span></div><b>On</b></div></main>}

    {flow && <div className="sheet-backdrop"><section className="sheet" role="dialog" aria-modal="true">
      <div className="sheet-handle"/>
      <div className="sheet-head"><h2>{flow==='request' ? 'Request money' : flow==='sent' ? 'Payment sent' : flow==='confirm' ? 'Confirm payment' : 'Send money'}</h2><button className="close" onClick={()=>setFlow(null)}>×</button></div>
      {flow==='send' && <><label>Phone number or DireTag</label><input value={recipient} onChange={e=>setRecipient(e.target.value)} placeholder="0911... or $diretag"/><label>Amount</label><input className="money-input" type="number" inputMode="decimal" min="1" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0 ETB"/><label>Note</label><input value={note} onChange={e=>setNote(e.target.value)} placeholder="What's this for?"/><button className="primary full" disabled={!canSend} onClick={()=>setFlow('confirm')}>Continue</button></>}
      {flow==='confirm' && <><div className="confirm-recipient"><span>Sending to</span><strong>{recipient}</strong></div><div className="confirm-amount">{parsed.toLocaleString()} <small>ETB</small></div>{note && <p className="confirm-note">{note}</p>}<button className="primary full" onClick={send}>Send payment</button><button className="text-button" onClick={()=>setFlow('send')}>Back</button></>}
      {flow==='sent' && <div className="success"><div className="success-icon">✓</div><h2>{parsed.toLocaleString()} ETB sent</h2><p>Demo payment to {recipient} completed.</p><button className="primary full" onClick={()=>{setFlow(null);reset()}}>Done</button></div>}
      {flow==='request' && <><label>From</label><input value={recipient} onChange={e=>setRecipient(e.target.value)} placeholder="Phone number or DireTag"/><label>Amount</label><input className="money-input" type="number" inputMode="decimal" min="1" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0 ETB"/><button className="primary full" disabled={!recipient.trim() || parsed<=0} onClick={()=>setFlow(null)}>Send request</button></>}
    </section></div>}

    <nav className="bottom-nav">
      {[['home','⌂','Home'],['activity','↕','Activity'],['card','▣','Card'],['profile','◎','Profile']].map(([key,icon,label])=><button key={key} className={tab===key?'active':''} onClick={()=>nav(key)}><span>{icon}</span>{label}</button>)}
    </nav>
  </div>
}

createRoot(document.getElementById('root')).render(<App/>);
