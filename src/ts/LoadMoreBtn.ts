import type { ILoadMoreBtn, LoadMoreBtnOpt, LoadMoreRefs } from '../types/LoadMoreBtn.types';
import { getRef } from '../utils/getRef';

export default class LoadMoreBtn implements ILoadMoreBtn {
	refs: LoadMoreRefs;

	constructor({ selector, hidden = false }: LoadMoreBtnOpt) {
		this.refs = this.getRefs(selector);
		hidden && this.hide();
	}
	getRefs(selector: string): LoadMoreRefs {
		if (typeof selector !== 'string') throw new Error('Selector must be type of "string"');

		return {
			button: getRef<HTMLButtonElement>(selector),
			label: getRef<HTMLSpanElement>(`${selector} > .load-more__label`),
			spinner: getRef<HTMLSpanElement>(`${selector} > .loader`),
		};
	}
	enable(text: string = 'Load more'): void {
		this.refs.button.disabled = false;
		this.refs.label.textContent = text;
		this.refs.spinner.classList.add('visually-hidden');
	}
	disable(text: string = 'Loading...'): void {
		this.refs.button.disabled = true;
		this.refs.label.textContent = text;
		this.refs.spinner.classList.remove('visually-hidden');
	}
	endList(condition: boolean): void | undefined {
		if (condition) {
			this.hide();
			this.refs.spinner.classList.add('visually-hidden');
		}
		return;
	}
	hide(): void {
		this.refs.button.classList.add('visually-hidden');
	}
	show(): void {
		this.refs.button.classList.remove('visually-hidden');
	}
}
