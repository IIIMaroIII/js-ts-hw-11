import './css/reset.css';
import './css/style.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import PixabayApi from './ts/PixabayApi';
import RenderFactory from './ts/RenderFactory';
import { getRef } from './utils/getRef';

const renderFactory = new RenderFactory();
const pixabayApi = new PixabayApi();

export interface Refs {
	form: HTMLFormElement | null;
}

const refs: Refs = {
	form: getRef<HTMLFormElement>('[data-form]'),
};

refs.form!.addEventListener('submit', onSearch);

function onSearch(e: Event): void {
	e.preventDefault();
	renderFactory.clear();

	const target = e.target as HTMLFormElement;
	const formData: FormData = new FormData(target);

	const SEARCH_TEXT = 'search-text';
	const q = formData.get(SEARCH_TEXT);

	if (typeof q !== 'string') return;

	pixabayApi
		.setQuery(q)
		?.fetchImages()
		.then(data => {
			if (data.hits.length === 0) {
				throw new Error('Sorry, there are no images matching your search query. Please try again!');
			}
			renderFactory.setImages(data.hits).createMarkup().renderMarkup();
			pixabayApi.increasePage();
		})
		.catch(err =>
			iziToast.error({
				message: err.message,
			}),
		);
}
