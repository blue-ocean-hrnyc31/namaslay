import React, {useState, useEffect} from 'react';
// import * as d3 from 'd3'


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
)

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

const Chart = () => {
    const [dataset, setDataset] = useState(
      generateDataset(dummyUsers)
    );

    console.log(dataset);
    return (

      <svg className='river-container'width='50%' height='50%' viewBox="0 0 100 100">
        <rect width="100%" height="100%" fill="black" />
        {dataset.map(({x, y}, i) => (
          <>
            <defs>
              <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor='rgb(255,255,255)' stopOpacity='1' />
                <stop offset="100%" stopColor='rgb(0,0,255)' stopOpacity='0' />
              </radialGradient>
            </defs>

            <circle
              cx={x}
              cy={y}
              r=".7"
              fill="url(#grad1)"
            />
          </>
        ))}
      </svg>

    )
  }
export default Chart;

