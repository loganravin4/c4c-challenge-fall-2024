import { useState, useEffect } from 'react';
import PartnerTile from './PartnerTile';

/*
  The top-level component containing everything relevant to the dashboard,
  including information on each partner
*/
function Dashboard() {

  const [partners, setPartners] = useState({});

  function toggleDropdown() {
    var dropdownContent = document.getElementById("myDropdown");
    dropdownContent.classList.toggle("show");
  }

  // Load all partners on initial page load 
  useEffect(() => {
    fetch('http://localhost:4000', {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => {
      setPartners(data);
    })
    .catch((err) => {
      console.error('Error fetching partners:', err);
    })
  }, [])

  const [partnerName, setPartnerName] = useState('');
  const [partnerDescription, setPartnerDescription] = useState('');
  const [partnerLogo, setPartnerLogo] = useState('');
  const [partnerActive, setPartnerActive] = useState(false);

  function handlePartnerNameChange(event) {
    setPartnerName(event.target.value);
  }

  function handlePartnerDescriptionChange(event) {
    setPartnerDescription(event.target.value);
  }

  function handlePartnerLogoChange(event) {
    setPartnerLogo(event.target.value);
  }

  function handlePartnerActiveChange(event) {
    setPartnerActive(event.target.checked);
  }

  function handlePartnerSubmit() {
    const newPartner = {
      name: partnerName,
      description: partnerDescription,
      logo: partnerLogo,
      active: partnerActive
    };

    setPartners(prevPartners => {
      return {
        ...prevPartners,
        [partnerName]: newPartner
      };
    });

    setPartnerName('');
    setPartnerDescription('');
    setPartnerLogo('');
    setPartnerActive(false);
  }

  return (
    <div id="main-content">
      <div className="dropdown">
        <button onClick={toggleDropdown} className="dropbtn">Add Partner Tile</button>
        <div id="myDropdown" className="dropdown-content">
          <p><input type="text" value={partnerName} onChange={handlePartnerNameChange} placeholder="Partner name"/></p>
          <p><input type="text" value={partnerDescription} onChange={handlePartnerDescriptionChange} placeholder="Partner description"/></p>
          <p><input type="text" value={partnerLogo} onChange={handlePartnerLogoChange} placeholder="Partner Logo Source"/></p>
          <p><input type="checkbox" checked={partnerActive} onChange={handlePartnerActiveChange} />Active?</p>
          <button className="submit" onClick={handlePartnerSubmit}>Submit</button>
        </div>
      </div>
      <div id="main-partners-grid">
        {Object.keys(partners).map((partnerKey) => (
          <PartnerTile key={partnerKey} partnerData={partners[partnerKey]} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard;