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

  return (
    <div id="main-content">
      <div class="dropdown">
        <button onclick="toggleDropdown()" class="dropbtn">Add Partner Tile</button>
        <div id="myDropdown" class="dropdown-content">
          <p><input type="text" id="textbox1" placeholder="Partner name"/></p>
          <p><input type="text" id="textbox2" placeholder="Partner description"/></p>
          <p><input type="text" id="textbox3" placeholder="Partner Logo Source"/></p>
          <p><input type="checkbox" id="checkbox1" /> Active?</p>
          <button className="submit">Submit</button>
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