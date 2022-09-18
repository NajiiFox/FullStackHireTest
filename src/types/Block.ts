export interface IBlocks {
  id: string;
  type: string;
  attributes: {
    index: number;
    timestamp: number;
    data: string;
    previousHash: string;
    hash: string;
  }
}