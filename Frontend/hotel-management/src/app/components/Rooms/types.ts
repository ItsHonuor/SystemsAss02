export type Room = {
  id: string;
  number: string;
  type: string;
  price: number;
  guests: number;
  status: "Available" | "Occupied" | "Cleaning" | "Maintenance";
};