import type { ISearch, SearchOptions } from '../types/Search.types';

export default class Search implements ISearch {
	private form: HTMLFormElement;
	private data: {};

	constructor({ selector }: SearchOptions) {
		this.form = this.getRef<HTMLFormElement>(selector);
		this.form && this.form.addEventListener('submit', this.onSubmit.bind(this));
		this.data = {};
	}

	private onSubmit(e: Event) {
		e.preventDefault();
		const target = e.target as HTMLFormElement;
		const formData: FormData = new FormData(target);
		const data = [...formData.entries()];
		console.log(data);
	}

	getRef<T extends HTMLElement>(selector: string): T | never {
		if (typeof selector !== 'string') {
			throw new Error('Must be a string');
		}
		const res = document.querySelector<T>(selector);
		if (res) {
			return res;
		}
		throw new Error('Invalid selector');
	}
}
