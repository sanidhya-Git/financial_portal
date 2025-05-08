export interface MarketIndex {
  current: number | null;
  prev: number | null;
}

export interface MarketData {
  nifty: MarketIndex;
  sensex: MarketIndex;
}


export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    features: string[];
  }
  
  export interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    image: string;
    rating: number;
  }
  
  export interface SuccessStory {
    id: string;
    title: string;
    description: string;
    results: {
      label: string;
      value: string;
    }[];
    image: string;
  }
  