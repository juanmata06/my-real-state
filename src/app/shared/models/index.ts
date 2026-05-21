export interface AgentInfo {
  name: string;
  title: string;
  photoUrl: string;
}

export interface HouseInfo {
  price: string;
  currency?: string;
  status?: string;
  isFeatured?: boolean;
  isReady?: boolean;
}
