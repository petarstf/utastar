import { Criteria } from './criteria';

export interface ITable {
  altName: string;
  altVals: { name: string }[];
  criteria: Criteria [];
  rank: number[];
}
