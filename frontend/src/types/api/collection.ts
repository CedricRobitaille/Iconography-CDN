export interface Collection {
  id: number;
  companyId: number;
  name: string;
  iconCount: number;
  monthlyUses: number;
  updatedAt: Date;
  createdAt: Date;
}

export interface CollectionResponse {
  collection: Collection
}

export interface CollectionIcon {
  id: number,
  collectionId: number,
  collection: Collection,
  iconId: 1,
  icon: {},
  createdAt: Date,
}

interface CollectionIconResponse {
  collection_Icon: CollectionIcon
}