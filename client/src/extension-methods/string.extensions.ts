export {};

declare global {
	interface String {
		capitalize(): string;
	}
}

if (!String.prototype.capitalize) {
	// eslint-disable-next-line no-extend-native
	String.prototype.capitalize = function (): string {
		return this ? this.charAt(0).toUpperCase() + this.slice(1) : "";
	};
}
