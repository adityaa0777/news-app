import React from 'react';
import "../css/card.css";

const card = ({ data }) => {
  console.log(data);

  return (
    <div className='cardContainer'>
      {data.map((curItem, index) => {
        // If no image is present, skip rendering
        if (!curItem.image_url) {
          return null;
        }

        return (
          <div className='card' key={index}>
            <img src={curItem.image_url} alt="news" />
            <div className='content'>
              <a className='title' onClick={() => window.open(curItem.link)}>{curItem.title}</a>
              <p>{curItem.description}</p>
              <button onClick={() => window.open(curItem.link)}>Read More</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default card;
