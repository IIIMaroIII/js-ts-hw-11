import './main.scss';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import PixabayApi from './ts/PixabayApi';
import RenderFactory from './ts/RenderFactory';
import { getRef } from './utils/getRef';
import LoadMoreBtn from './ts/LoadMoreBtn';
import type { PixabayImagesResponse } from './types/PixabayApi.types';

const renderFactory = new RenderFactory();
const pixabayApi = new PixabayApi();
const loadMore = new LoadMoreBtn({ selector: '[data-btn=loadMore]', hidden: true });

export interface Refs {
	form: HTMLFormElement;
}

const refs: Refs = {
	form: getRef<HTMLFormElement>('[data-form]'),
};

refs.form.addEventListener('submit', onSearch);
loadMore.refs.button.addEventListener('click', onLoadMore);

function onLoadMore(e: Event) {
	loadMore.disable();

	pixabayApi.fetchImages().then(res => {
		fetchImages(res);
		renderFactory.scrollToEl();
	});
}

function onSearch(e: Event): void {
	e.preventDefault();
	pixabayApi.resetPage();
	loadMore.show();
	loadMore.disable();
	const target = e.target as HTMLFormElement;
	const formData: FormData = new FormData(target);

	const SEARCH_TEXT = 'search-text';
	const q = formData.get(SEARCH_TEXT);

	if (typeof q !== 'string') return;

	pixabayApi
		.setQuery(q)
		?.fetchImages()
		.then(res => {
			if (res.hits.length === 0) {
				loadMore.hide();
				return alert('Sorry, we have not found any images!');
			}
			iziToast.info({
				message: `Hooray! We found ${res.total} totalHits images.! ✅`,
				position: 'topCenter',
				timeout: 2000,
			});
			renderFactory.clear();
			pixabayApi.isEndOfList(res.total);
			fetchImages(res);
		})
		.catch(err => {
			iziToast.error({
				message: err.message,
				position: 'topCenter',
				timeout: 5000,
			});
			loadMore.hide();
		});
}

function fetchImages(response: PixabayImagesResponse): void {
	pixabayApi.isEndOfList(response.total);
	renderFactory.setImages(response.hits).renderMarkup();
	pixabayApi.increasePage();

	if (pixabayApi.isTheLastPage) {
		loadMore.endList(pixabayApi.isTheLastPage);
		iziToast.warning({
			message: 'You have reached the end of the collection!',
			position: 'bottomCenter',
			timeout: 2000,
		});
		return;
	}

	loadMore.enable();
}
