import { IdObject } from './id-object.model';
/**
 * Interface for objects having a code and a name.
 */
export interface NamedObject extends IdObject {
  name: string;
}
