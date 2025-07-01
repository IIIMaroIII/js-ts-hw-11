export interface ISearch {
	getRef<T extends HTMLElement>(selector: string): T | never;
}

export interface SearchOptions {
	selector: string;
}
