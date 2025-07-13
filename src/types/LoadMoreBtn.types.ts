export interface LoadMoreRefs {
	button: HTMLButtonElement;
	label: HTMLSpanElement;
	spinner: HTMLSpanElement;
}

export interface ILoadMoreBtn {
	refs: LoadMoreRefs;
	getRefs(selector: string): LoadMoreRefs;
	enable(text: string): void;
	disable(text: string): void;
	endList(condition: boolean): void | undefined;
	show(): void;
	hide(): void;
}
export interface LoadMoreBtnOpt {
	selector: string;
	hidden: boolean;
}
