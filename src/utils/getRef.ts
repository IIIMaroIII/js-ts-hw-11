export function getRef<T extends HTMLElement>(selector: string): T {
	if (typeof selector !== 'string') throw new Error('Selector must be type of string');

	const el = document.querySelector<T>(selector);

	if (!el) throw new Error(`The element of selector ${selector} has not been found`);

	return el;
}
