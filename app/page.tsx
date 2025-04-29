'use client'
import { useState } from "react"

export default function Page() {
  const [population, setPopulation] = useState(20000)
  const [area, setArea] = useState(4)
  const [accessPct, setAccessPct] = useState(60)
  const [radius, setRadius] = useState(500)
  const [density, setDensity] = useState("medium")
  const [result, setResult] = useState(null)

  const calculate = () => {
    const accessNeed = population * (accessPct / 100)
    const healthCenters = Math.ceil(accessNeed / 10000)
    const emergencyPods = Math.ceil(population / 5000)
    const mobileUnits = Math.ceil(area / 10)
    const telemedicine = Math.ceil(population / 5000)
    const educationPoints = Math.ceil(population / 10000)
    const ambulanceStations = Math.ceil(area / (density === "high" ? 2 : 4))

    setResult({
      healthCenters,
      emergencyPods,
      mobileUnits,
      telemedicine,
      educationPoints,
      ambulanceStations,
    })
  }

  return (
    <main>
      <h1>Urban Healthcare Planning Tool</h1>
      <div style={{ display: 'grid', gap: 10, maxWidth: 400 }}>
        <label>Population<input type="number" value={population} onChange={e => setPopulation(+e.target.value)} /></label>
        <label>Area (km²)<input type="number" value={area} onChange={e => setArea(+e.target.value)} /></label>
        <label>% Needing Access<input type="number" value={accessPct} onChange={e => setAccessPct(+e.target.value)} /></label>
        <label>Walkable Radius (m)<input type="number" value={radius} onChange={e => setRadius(+e.target.value)} /></label>
        <label>Urban Density
          <select value={density} onChange={e => setDensity(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <button onClick={calculate}>Calculate</button>
      </div>
      {result && (
        <ul style={{ marginTop: 20 }}>
          <li>Primary Health Centers: {result.healthCenters}</li>
          <li>Emergency Pods: {result.emergencyPods}</li>
          <li>Mobile Clinics: {result.mobileUnits}</li>
          <li>Telemedicine Kiosks: {result.telemedicine}</li>
          <li>Health Education Points: {result.educationPoints}</li>
          <li>Ambulance Stations: {result.ambulanceStations}</li>
        </ul>
      )}
    </main>
  )
}
