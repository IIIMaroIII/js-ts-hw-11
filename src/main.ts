import 'reset-css/reset.css';
import type { PixabayApiOptions } from './types/PixabayApi.types';
import PixabayApi from './ts/PixabayApi';
import Search from './ts/Search';

const opt: PixabayApiOptions = {
	key: '42204653-dde2ea6d5277704e408fb2018',
	baseUrl: 'https://pixabay.com/api/',
};

const pixabayApi = new PixabayApi(opt);
const search = new Search({ selector: '[data-form]' });

const res = pixabayApi.setQuery('dog')?.fetchImages();
res?.then(console.log);
