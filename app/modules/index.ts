import { ModulesDictionary } from '../types';
import { ImageModule } from './image';
import { TextModule } from './text';

export const modules: ModulesDictionary = {
  image: new ImageModule(),
  text: new TextModule(),
};
