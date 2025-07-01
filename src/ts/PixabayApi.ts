import type {
	IPixabayApi,
	PixabayApiOptions,
	PixabayImagesResponse,
} from '../types/PixabayApi.types';

export default class PixabayApi implements IPixabayApi {
	private baseUrl: string;
	private key: string;
	private q: string;
	constructor({ baseUrl, key }: PixabayApiOptions) {
		this.baseUrl = baseUrl;
		this.key = key;
		this.q = '';
	}
	fetchImages(opt: RequestInit = {}): Promise<PixabayImagesResponse> {
		const url: string = `${this.baseUrl}?key=${this.key}&q=${this.q}`;
		return fetch(url, opt).then(r => r.json() as Promise<PixabayImagesResponse>);
	}

	setQuery(q: string): this | undefined {
		if (!q) return;
		this.q = q;
		return this;
	}
}
