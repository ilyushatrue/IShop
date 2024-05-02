import getConstant from "../infrastructure/constantProvider";

export async function tryFetch<T>(request: () => Promise<Response>) {
	const fullUrl = getConstant("API_URL")
	const response = await request();
	if (response.ok) {
		const result = await response.json() as T;
		return result;
	} else if (response.status === 401) {
		await tryFetch<boolean>(async () => {
			return await fetch(fullUrl + );
		})
		await tryFetch(request);
		redirect("/login");
	}
	else {
		console.error("Error");
		return undefined;
	}
}

const api = {
	getAsync: async (url: string): Promise<any> => {
		const fullUrl = getConstant("API_URL") + url;
		try {
			const response = await fetch(fullUrl, {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				console.log(1)
				const result = await response.json();
				console.log(result)
				return result.value;
			} else if (response.status === 401) {
				redirect("/login");
			}
			else {
				console.error("Error");
				return undefined;
			}
		}
		catch (error) {

		}
	},
	postAsync: async (url: string, data: any): Promise<any> => {
		const fullUrl = getConstant("API_URL") + url;
		const response = await fetch(fullUrl, {
			method: "POST",
			body: JSON.stringify(data),
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			const result = await response.json();
			console.log(result)
			return result.value;
		} else if (response.status === 401) {
			redirect("/login")
		}
		else {
			console.error("Error");
			return undefined;
		}
	},
};

export function redirect(url: string, newTab: boolean = false) {
	if (newTab) {
		window?.open(url, "_blank")?.focus();
	} else {
		window.location.href = url;
	}
}
export default api;
