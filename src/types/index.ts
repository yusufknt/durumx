export interface MenuItem {
  id: number;
  name: string;
  desc: string;
  price: string;
  img: string;
  category: string;
  ingredients: string[];
  isPopular?: boolean;
  isNew?: boolean;
  variant?: "styled";
}

export interface Branch {
  id: string;
  name: string;
  city: string;
  district: string;
  address: string;
  phone: string;
  phone2?: string;
  services: Array<"paket" | "gel-al" | "masa">;
  hours: string;
  mapsUrl: string;
  lat: number;
  lng: number;
}
