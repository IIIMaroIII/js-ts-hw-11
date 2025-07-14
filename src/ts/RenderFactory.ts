import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import type { PixabayImageHit } from '../types/PixabayApi.types';
import type { IRenderFactory } from '../types/RenderFactory.types';
import { getRef } from '../utils/getRef';

const slb = new SimpleLightbox('.gallery__item a', {
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
		this.createMarkup();
		this.root.insertAdjacentHTML('beforeend', this.markup);
		slb.refresh();
	}

	setImages(images: PixabayImageHit[]): this {
		this.images = images;
		return this;
	}

	scrollToEl(): void {
		const { children } = this.root;
		if (children.length) {
			console.log('inside the scrollTo');
			const lastEl = children[children.length - 1] as HTMLElement;
			// here
			if (lastEl) {
				const rect = lastEl.getBoundingClientRect();
				console.log(rect);
				window.scroll({ top: lastEl.offsetTop - rect.height, behavior: 'smooth' });
			}
		}
	}
	s;
	// here
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
			<div class="image__wrapper">
              <img src="${hit.previewURL}" alt="${hit.tags}" class="gallery__img">  
              </div>
              
              <div class="info__wrapper">
                <p class="info">Likes: ${hit.likes}</p>
                <p class="info">Views: ${hit.views}</p>
                <p class="info">Comments:${hit.comments}</p>
                <p class="info">${hit.downloads}</p>
              </div>
            </a>
        </li>`;
	}
}
