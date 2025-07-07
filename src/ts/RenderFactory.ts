import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import type { PixabayImageHit } from '../types/PixabayApi.types';
import type { IRenderFactory } from '../types/RenderFactory.types';
import { getRef } from '../utils/getRef';

const slb = new SimpleLightbox('[data-gallery] a', {
	captionsData: 'alt',
	captionDelay: 250,
});

export default class RenderFactory implements IRenderFactory {
	readonly root: HTMLUListElement;
	private images: PixabayImageHit[] = [];
	private markup: string = '';

	constructor(root: string = '[data-gallery]') {
		this.root = getRef<HTMLUListElement>(root);
	}

	renderMarkup(): void {
		this.root.insertAdjacentHTML('beforeend', this.markup);
		slb.refresh();
	}

	setImages(images: PixabayImageHit[]): this {
		this.images = images;
		return this;
	}

	createMarkup(): this {
		this.markup = this.images.map(this.createGalleryItem.bind(this)).join('');
		return this;
	}
	clear(): this {
		this.root.innerHTML = '';
		return this;
	}
	private createGalleryItem(hit: PixabayImageHit): string {
		return `  
        <li class="gallery__item">
            <a href="${hit.largeImageURL}" class="gallery__link">
              <img src="${hit.previewURL}" alt="${hit.tags}" class="gallery__img">
              <div class="info__wrapper">
                <p class="info">${hit.likes}</p>
                <p class="info">${hit.views}</p>
                <p class="info">${hit.comments}</p>
                <p class="info">${hit.downloads}</p>
              </div>
            </a>
        </li>`;
	}
}
