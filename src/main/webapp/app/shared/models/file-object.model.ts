import { NamedObject } from 'app/shared/models/named-object.model';

/**
 * Interface for objects having a code, name and a filename.
 */
export interface FileObject extends NamedObject {
  filename: string;
}
