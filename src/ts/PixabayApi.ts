import iziToast from 'izitoast';
import type {
	IPixabayApi,
	PixabayApiOptions,
	PixabayImagesResponse,
} from '../types/PixabayApi.types';

const opt: PixabayApiOptions = {
	key: '42204653-dde2ea6d5277704e408fb2018',
	baseUrl: 'https://pixabay.com/api/',
};

export default class PixabayApi implements IPixabayApi {
	private baseUrl: string;
	private key: string;
	private q: string;
	page: number;
	per_page: number;
	isTheLastPage: boolean;

	constructor({ baseUrl, key }: PixabayApiOptions = opt) {
		this.baseUrl = baseUrl;
		this.key = key;
		this.q = '';
		this.page = 1;
		this.per_page = 10;
		this.isTheLastPage = false;
	}
	fetchImages(opt: RequestInit = {}): Promise<PixabayImagesResponse> {
		const url: string = `${this.baseUrl}?key=${this.key}&q=${this.q}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`;
		return fetch(url, opt)
			.then(result => result.json() as Promise<PixabayImagesResponse>)
			.then(res => {
				this.isEndOfList(res.total);
				return res;
			});
	}
	isEndOfList(total: number): this {
		this.isTheLastPage = this.page * this.per_page >= total;
		return this;
	}

	setQuery(q: string): this | undefined {
		if (!q) return;
		this.q = q;
		return this;
	}
	increasePage(): this {
		this.page += 1;
		return this;
	}
	resetPage(): this {
		this.page = 1;
		return this;
	}
	get perPage(): number {
		return this.per_page;
	}
	set perPage(value: number) {
		this.per_page = value;
	}
}
