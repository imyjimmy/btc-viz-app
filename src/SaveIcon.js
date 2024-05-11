import React from 'react';

function ReactSaveIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return React.createElement('svg', Object.assign({
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: "0 0 32 32",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), 
    title ? React.createElement('title', 
    { id: titleId }, title) : null,
    React.createElement('path', {
      d: "M 5 5 L 5 27 L 27 27 L 27 9.59375 L 26.71875 9.28125 L 22.71875 5.28125 L 22.40625 5 Z M 7 7 L 10 7 L 10 13 L 22 13 L 22 7.4375 L 25 10.4375 L 25 25 L 23 25 L 23 16 L 9 16 L 9 25 L 7 25 Z M 12 7 L 16 7 L 16 9 L 18 9 L 18 7 L 20 7 L 20 11 L 12 11 Z M 11 18 L 21 18 L 21 25 L 11 25 Z"
    }),
    // React.createElement('rect', {
    //   width: "10", height: "8", x: "7", y: "13"
    // })
    // React.createElement('path', {
    //   d: "M6,10H9A1,1,0,0,0,9,8H6A1,1,0,0,0,6,10Z"
    // }),
    // React.createElement('path', {
    //   d: "M14,12H6a1,1,0,0,0,0,2h8A1,1,0,0,0,14,12Z"
    // }),
    // React.createElement('path', {
    //   d: "M14,16H6a1,1,0,0,0,0,2h8A1,1,0,0,0,14,16Z"
    // })
  );
}

const SaveIcon = React.forwardRef(ReactSaveIcon);

export { SaveIcon }
