import getConst from "./constantProvider";

const api = {
	getAsync: async (url: string): Promise<any> => {
		const fullUrl = getConst("API_URL") + url;
        console.log(fullUrl)
		const response = await fetch(fullUrl, {
			method: "GET",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const result = await response.json();
		return result.value;
	},
	postAsync: async (url: string, data: any): Promise<any> => {
		const fullUrl = getConst("API_URL") + url;
		const response = await fetch(fullUrl, {
			method: "POST",
			body: JSON.stringify(data),
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			const result = await response.json();
			return result.value;
		} else {
			console.error("Error");
			return undefined;
		}
	},
};

export default api;
