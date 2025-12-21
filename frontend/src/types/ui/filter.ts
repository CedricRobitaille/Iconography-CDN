export interface FilterItem {
  icon: string;
  name: string;
  qty: number;
}

export interface FilterGroup {
  theme: string;
  items: FilterItem[]
}