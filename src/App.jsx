import { useState } from 'react'

function App() {
  const [bloodGroup, setBloodGroup] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [donors, setDonors] = useState([])
  const [form, setForm] = useState({name:'', bloodGroup:'O+', phone:'', country:'', city:''})

  const searchDonors = async () => {
    const res = await fetch(`http://localhost:5000/api/donors/search?bloodGroup=${encodeURIComponent(bloodGroup)}&country=${encodeURIComponent(country)}&city=${encodeURIComponent(city)}`);
    const data = await res.json()
    setDonors(data)
    if(data.length===0) alert('No donor found, try registering one first')
  }

  const registerDonor = async (e) => {
    e.preventDefault()
    await fetch('http://localhost:5000/api/donors/register', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(form)
    })
    alert('✅ Donor Registered! Ab search me ayega')
    setForm({name:'', bloodGroup:'O+', phone:'', country:'', city:''})
  }

  return (
    <div style={{fontFamily:'Segoe UI', background:'#fff', minHeight:'100vh'}}>
      <nav style={{background:'#dc2626', color:'white', padding:'15px 30px', display:'flex', justifyContent:'space-between'}}>
        <h2 style={{margin:0}}>🩸 BloodLink Global</h2>
        <span>Pakistan to World</span>
      </nav>

      <div style={{background:'#fef2f2', textAlign:'center', padding:'40px 20px'}}>
        <h1 style={{color:'#991b1b', fontSize:'40px', margin:0}}>Save Life, Donate Blood Worldwide</h1>
        <p>Find blood donors in 195 countries in just 10 seconds</p>
        <div style={{background:'white', maxWidth:'900px', margin:'30px auto', padding:'20px', borderRadius:'12px', display:'flex', gap:'10px', flexWrap:'wrap'}}>
          <select value={bloodGroup} onChange={e=>setBloodGroup(e.target.value)} style={{padding:'12px', flex:1}}>
            <option value="">Blood Group</option><option>O+</option><option>O-</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option>
          </select>
          <input value={country} onChange={e=>setCountry(e.target.value)} placeholder="Country e.g. Pakistan" style={{padding:'12px', flex:1}}/>
          <input value={city} onChange={e=>setCity(e.target.value)} placeholder="City e.g. Faisalabad" style={{padding:'12px', flex:1}}/>
          <button onClick={searchDonors} style={{background:'#dc2626', color:'white', border:'none', padding:'12px 25px', borderRadius:'8px', cursor:'pointer'}}>Search Donor</button>
        </div>
      </div>

      <div style={{display:'flex', gap:'30px', padding:'30px', flexWrap:'wrap', justifyContent:'center'}}>
        <div style={{flex:1, minWidth:'300px'}}>
          <h3>Found Donors: {donors.length}</h3>
          {donors.map(d=>(
            <div key={d._id} style={{border:'1px solid #fecaca', padding:'15px', borderRadius:'10px', marginBottom:'10px'}}>
              <b>{d.name}</b> - {d.bloodGroup} <br/> {d.city}, {d.country} <br/> <br/>
<div style={{display:'flex', gap:'10px', marginTop:'8px'}}>
  <a href={`tel:${d.phone}`} style={{background:'#3b82f6', color:'white', padding:'6px 12px', borderRadius:'6px', textDecoration:'none'}}>
    📞 Call
  </a>
  <a href={`https://wa.me/92${d.phone?.slice(1)}?text=Salam ${d.name}, mujhe ${d.bloodGroup} blood chahiye ${d.city} me - BloodLink Global se number mila`} target="_blank" style={{background:'#25D366', color:'white', padding:'6px 12px', borderRadius:'6px', textDecoration:'none'}}>
    💬 WhatsApp
  </a>
</div>
            </div>
          ))}
        </div>

        <div style={{flex:1, minWidth:'300px', background:'#fff7f7', padding:'20px', borderRadius:'12px', border:'1px solid #fecaca'}}>
          <h3 style={{color:'#dc2626'}}>Register as Donor</h3>
          <form onSubmit={registerDonor} style={{display:'flex', flexDirection:'column', gap:'10px'}}>
            <input required placeholder="Full Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} style={{padding:'10px'}}/>
            <select value={form.bloodGroup} onChange={e=>setForm({...form, bloodGroup:e.target.value})} style={{padding:'10px'}}><option>O+</option><option>O-</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option></select>
            <input required placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} style={{padding:'10px'}}/>
            <input required placeholder="Country" value={form.country} onChange={e=>setForm({...form, country:e.target.value})} style={{padding:'10px'}}/>
            <input required placeholder="City e.g. Faisalabad" value={form.city} onChange={e=>setForm({...form, city:e.target.value})} style={{padding:'10px'}}/>
            <button type="submit" style={{background:'#16a34a', color:'white', border:'none', padding:'12px', borderRadius:'8px', cursor:'pointer', fontWeight:'bold'}}>Become a Donor</button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default App
