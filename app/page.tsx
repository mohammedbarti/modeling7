// Step-by-step build of the new HMG Urban Planning Tool (page.tsx)

"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    population: "",
    area: "",
    walkDistance: "",
    density: "Low",
    regularAccess: "",
    growthIndex: "Stable",
    ageGroup: "",
    genderGroup: "",
    settingType: "Urban"
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pop = parseInt(form.population);
    const reg = parseFloat(form.regularAccess) / 100;
    const basePHC = Math.ceil((pop * reg) / 10000);
    const basePods = Math.ceil((pop * reg) / 5000);
    const teleBooths = Math.ceil((pop * reg) / 5000);
    let mobileUnits = Math.ceil(parseFloat(form.area) / 10);

    // Adjustments based on growth
    let multiplier = form.growthIndex === "Growing" ? 1.15 : form.growthIndex === "Declining" ? 0.9 : 1;
    const adjustedPHC = Math.ceil(basePHC * multiplier);
    const adjustedPods = Math.ceil(basePods * multiplier);
    const adjustedTele = Math.ceil(teleBooths * multiplier);
    const adjustedMobile = Math.ceil(mobileUnits * multiplier);

    // Age/Gender Modifiers
    const geriatric = parseInt(form.ageGroup) >= 20 ? 1 : 0;
    const maternal = parseInt(form.genderGroup) >= 50 ? 1 : 0;

    // Rural Modifiers
    const helipadPod = form.settingType === "Rural" ? 1 : 0;
    const extraMobile = form.settingType === "Rural" ? 1 : 0;

    setResult({
      phc: adjustedPHC,
      pods: adjustedPods,
      tele: adjustedTele,
      mobile: adjustedMobile + extraMobile,
      helipadPod,
      geriatric,
      maternal
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      {/* Logo */}
      <Image src="/logo.png" alt="HMG Logo" width={100} height={60} className="absolute top-4 left-4" />

      <h1 className="text-2xl font-bold text-center mb-6">HMG Urban Planning Tool</h1>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <div className="grid gap-4">
          <input type="number" name="population" placeholder="Population" onChange={handleChange} required className="border p-2" />
          <input type="number" name="area" placeholder="Area (km²)" onChange={handleChange} required className="border p-2" />
          <input type="number" name="walkDistance" placeholder="Walk Distance (m)" onChange={handleChange} required className="border p-2" />
          <input type="number" name="regularAccess" placeholder="% Requiring Regular Care" onChange={handleChange} required className="border p-2" />

          <select name="density" onChange={handleChange} className="border p-2">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <select name="growthIndex" onChange={handleChange} className="border p-2">
            <option>Stable</option>
            <option>Growing</option>
            <option>Declining</option>
          </select>

          <input type="number" name="ageGroup" placeholder="% Elderly Population" onChange={handleChange} className="border p-2" />
          <input type="number" name="genderGroup" placeholder="% Female Population" onChange={handleChange} className="border p-2" />

          <select name="settingType" onChange={handleChange} className="border p-2">
            <option>Urban</option>
            <option>Rural</option>
          </select>

          <button type="submit" className="bg-blue-600 text-white py-2">Generate Recommendations</button>
        </div>
      </form>

      {result && (
        <div className="max-w-xl mx-auto bg-white mt-6 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>{result.phc} Primary Health Centers – based on population and regular access rate</li>
            <li>{result.pods} Emergency Pods – calculated per 5,000 residents</li>
            <li>{result.tele} Telemedicine Booths – evenly distributed by usage ratio</li>
            <li>{result.mobile} Mobile Clinics – based on area and rural adjustment</li>
            {result.helipadPod > 0 && <li>1 Helipad-Equipped Emergency Pod – due to rural classification</li>}
            {result.geriatric > 0 && <li>1 Geriatric Care Unit – based on elderly population ≥ 20%</li>}
            {result.maternal > 0 && <li>1 Maternal Health Center – due to female population ≥ 50%</li>}
          </ul>
        </div>
      )}

      {/* Footer */}
      <footer className="text-xs text-right pr-4 pt-10 text-gray-500 absolute bottom-2 right-2">
        Made by: Dr. Mohammed AlBarti – Corporate Business Development
      </footer>
    </div>
  );
}
