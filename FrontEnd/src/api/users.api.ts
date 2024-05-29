import api from "./api";

const usersApi = {
	getCurrentAsync: async (): Promise<Response> => {
		return await api.getAsync("/users/current");
	},
};

export default usersApi;
