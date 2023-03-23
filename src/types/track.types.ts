const track = {
  id: 14,
  departureStation: "Hồ Chí Minh",
  departureTime: "2023-03-23T00:00:00",
  arrivalStation: "Hà Nội",
  returnTime: "2023-03-25T00:00:00",
  trainTracks: [
    {
      id: 4,
      trackId: 14,
      trainId: 4,
      train: {
        id: 4,
        name: "SE7",
        carriages: [
          {
            id: 2,
            carriageNo: 1,
            totalSeats: 36,
            trainId: 4,
          },
          {
            id: 2,
            carriageNo: 1,
            totalSeats: 36,
            trainId: 4,
          },
        ],
        totalCarriages: 0,
      },
    },
  ],
};

export type TrackType = {
  departureStation: string;
  departureTime: string;
  arrivalStation: string;
  returnTime: string;
  trainTracks: {
    id: number;
    trackId: number;
    trainId: number;
    train: {
      id: number;
      name: string;
      carriages: {
        id: number;
        carriageNo: number;
        totalSeats: number;
        trainId: number;
      }[];
      totalCarriages: number;
    };
  }[];
};

export type TrackListType = {
  trackList: TrackType[];
};
