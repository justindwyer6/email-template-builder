import { ModulesDictionary } from '../types';
import { ImageModule } from './image';

export const modules: ModulesDictionary = {
  image: new ImageModule(),
};
