export const a = "xd";

export interface InfoSentInterface {
  idUser: string;
  startStr: string;
  endStr: string;
  franjas: string[];
}


export interface SingleInfoReceivedInterface {
  id: string; //This one must be set as unique in DB
  date: string;
  franjaId: string;
  taken: boolean;
}

export type respInfoReceived = Array<SingleInfoReceivedInterface>

// e.i

const infoSend: InfoSentInterface = {
  idUser: "eyuuuin12xnh233",
  startStr: "2022-12-09",
  endStr: "2022-12-12",
  franjas: ["0", "7", "8", "10"]
}