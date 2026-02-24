export type MenuItem = {
  id: string;
  name: string;
  category: "Starter" | "Main" | "Dessert" | "Drinks";
  price: number;
  available: boolean;
  image: string;
};
