import React from 'react';

const RoundDiv = ({ children, numAlbums }) => {
    const divStyle = {
      display: 'flex',
      justifyContent: 'space-between', // make space between albums even
      width: '100%', // fill parent container
    };
  
    const childDivs = [];
    for (let i = 0; i < numAlbums; i++) {
      childDivs.push(
        // split each round into `numAlbums` number of divs
        // the divs will be evenly spaced so they appear underneath the options from the previous round
        // the width of each div doubles in the next round
        <div key={i} style={{ flex: `1 0 ${100 / numAlbums}%` }}>
          {children[i]}
        </div>
      );
    }

    // make all the divs have the same style
    // pass in the albums in the current round `childDivs` to the main div which holds them on the screen
    return <div style={divStyle}>{childDivs}</div>;
  };

export default RoundDiv;
