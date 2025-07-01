export interface PixabayImageHit {
	id: number;
	pageURL: string;
	type: string;
	tags: string;
	previewURL: string;
	previewWidth: number;
	previewHeight: number;
	webformatURL: string;
	webformatWidth: number;
	webformatHeight: number;
	largeImageURL: string;
	imageWidth: number;
	imageHeight: number;
	imageSize: number;
	views: number;
	downloads: number;
	collections: number;
	likes: number;
	comments: number;
	user_id: number;
	user: string;
	userImageURL: string;
	noAiTraining: boolean;
	isAiGenerated: boolean;
	isGRated: boolean;
	isLowQuality: number;
	userURL: string;
}

export interface PixabayImagesResponse {
	total: number;
	totalHits: number;
	hits: PixabayImageHit[];
}

export interface IPixabayApi {
	fetchImages(opt: RequestInit): Promise<PixabayImagesResponse>;
	setQuery(q: string): this | undefined;
}
// fetchOpt: RequestInit = {}, baseUrl: string = ''
export interface PixabayApiOptions {
	baseUrl: string;
	key: string;
}
