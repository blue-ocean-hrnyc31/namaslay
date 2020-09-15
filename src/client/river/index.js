import React, {useState, useEffect} from 'react';
import * as d3 from 'd3'


const generateDataset = (userList) => (
  Array(200).fill(0).map(() => {
    const randUserIndex = Math.floor(Math.random() * userList.length);
    return {
      x: Math.random() * 100,
      y: Math.random() * 100,
      name: userList[randUserIndex].name,
      location: userList[randUserIndex].location,
      status: userList[randUserIndex].status,
    };
  })
);

const Chart = (view, allUsersInAsana) => {
    const [dataset, setDataset] = useState(

      generateDataset(dummyUsers)

    );

    const [hoveredObj, updateHovered] = useState({
      isHovered: false,
      name: 'No one',
      location: 'No where',
      status: 'Not existing'
    });

    //console.log(dataset);


    return (
      <div className='river-container'>
      <svg width='90%' height='90%' viewBox="0 0 100 100">
        {
          hoveredObj.isHovered ? <p>{hoveredObj.name} , {hoveredObj.location}</p> : <p></p>
        }
        <rect width="100%" height="100%" fill="black" />
        {dataset.map(({x, y, name, location, status}, i) => (
          <>
            <defs>
              <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor='rgb(255,255,255)' stopOpacity='1' />
                <stop offset="100%" stopColor='rgb(0,0,255)' stopOpacity='0' />
              </radialGradient>
            </defs>

            <circle
              onMouseEnter={() => {
                console.log(name, location, status);
                updateHovered({
                  isHovered: true,
                  name,
                  location,
                  status
                })
              }}
              onMouseLeave={() => {
                console.log(name, location, status);
                updateHovered({
                  isHovered: false,
                  name,
                  location,
                  status
                })
              }}
              cx={x}
              cy={y}
              r="1.3"
              fill="url(#grad1)"
            />
          </>
        ))}
      </svg>
      </div>
    )
}

export default Chart;



const dummyUsers = [
  {
    name: "Liam",
    location: "NYC",
    status: "Chilllllllllin"
  },
  {
    name: "Bobbito",
    location: "Cali",
    status: "Shredding gnar"
  },
  {
    name: "Nuri",
    location: "NYC",
    status: "Just vibingggg"
  },
  {
    name: "Trent",
    location: "NYC",
    status: "Beep booping"
  }
];

