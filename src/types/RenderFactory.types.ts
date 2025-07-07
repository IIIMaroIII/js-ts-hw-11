import type { PixabayImageHit } from './PixabayApi.types';

export interface IRenderFactory {
	readonly root: HTMLUListElement;

	setImages(images: PixabayImageHit[]): this;
	renderMarkup(): void;
	createMarkup(): this;
	clear(): this;
}
