const tripsData = [
  {
    title: "trip1",
    author: "fergus",
    startLocation: {
      city: "nottingham",
      coordinates: {
        lat: 52.954,
        lng: -1.155,
      },
    },
    destination: {
      city: "manchester",
      arrivalDate: "2023-04-04",
      departureDate: "2023-04-08",
      activities: [
        {
          name: "The Warehouse Project",
          address: "Mayfield Train Station, The Depot, Manchester M1 2QF",
          coordinates: {
            lat: 53.4756,
            lng: -2.2253,
          },
        },
        {
          name: "Hidden at Downtex Mill",
          address: "Mayfield Train Station, The Depot, Manchester M1 2QF",
          coordinates: {
            lat: 53.4756,
            lng: -2.2253,
          },
        },
      ],
    },
  },
  {
    title: "trip2",
    author: "martin",
    startLocation: {
      city: "london",
      coordinates: {
        lat: 51.5072,
        lng: -0.1276,
      },
    },
    preferences: ["music", "nightlife", "food"],
    destination: {
      city: "manchester",
      arrivalDate: "2023-04-04",
      departureDate: "2023-04-08",
      activities: [
        {
          name: "The Warehouse Project",
          address: "Mayfield Train Station, The Depot, Manchester M1 2QF",
          coordinates: {
            lat: 53.4756,
            lng: -2.2253,
          },
        },
        {
          name: "Hidden at Downtex Mill",
          address: "Mayfield Train Station, The Depot, Manchester M1 2QF",
          coordinates: {
            lat: 53.4756,
            lng: -2.2253,
          },
        },
      ],
    },
  },
];

export default { tripsData };
