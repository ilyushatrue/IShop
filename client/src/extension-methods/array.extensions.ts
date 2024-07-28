export { };
declare global {
	interface Array<T> {
		groupBy<K extends keyof any>(key: (item: T) => K): Record<K, T[]>;
	}
}

if (!Array.prototype.groupBy) {
	// eslint-disable-next-line no-extend-native
	Array.prototype.groupBy = function <T, K extends keyof any>(key: (item: T) => K): Record<K, T[]> {
		return this.reduce((result: Record<K, T[]>, currentValue: T) => {
			const groupKey = key(currentValue);
			if (!result[groupKey]) {
				result[groupKey] = [];
			}
			result[groupKey].push(currentValue);
			return result;
		}, {} as Record<K, T[]>);
	};
}
