import React from 'react';

/*
  A block for a single partner, containing information for them
  along with any tools to manage said information
*/

function PartnerTile({ partnerData }) {
  const isActive = partnerData.isActive ? 'true-color' : 'false-color';
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
        <button className="delete-button">Delete</button>
      </div>
    </div>
  )
}

export default PartnerTile;