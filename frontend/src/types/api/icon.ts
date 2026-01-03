export interface Icon {
  id: number;
  name: string;
  svg: string;
  type: string;
  category: string;
  tags: iconTag[];
}

interface iconTag {
  id: number,
  name: string
}