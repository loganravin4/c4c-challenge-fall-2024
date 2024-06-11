import React from 'react';

/*
  A block for a single partner, containing information for them
  along with any tools to manage said information
*/

function PartnerTile({ partnerData }) {
  const isActive = partnerData.isActive ? 'true-color' : 'false-color';
  const onClick = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this partner?');
    if (confirmDelete) {
      fetch('http://localhost:4000/partners/' + partnerData.id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error('Error deleting partner:', err);
      })
    }
  };

  return (
    <div className="partner-tile">
      <img className="partner-thumbnail" src={partnerData.thumbnailUrl} />
      <hr />
      <div className="partner-info">
        <h2>{partnerData.name}</h2>
        <p className={isActive}>
          {partnerData.isActive ? 'Active' : 'Inactive'}
        </p>
        <p>{partnerData.description}</p>
        <button className="delete-button" onClick={onClick}>Delete</button>
      </div>
    </div>
  );
}

export default PartnerTile;