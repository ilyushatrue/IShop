export const loginValidation = {
	required: 'Обязательно для заоплнения',
	validate: (value: string) => {
		if (value.match(/[а-яА-Я]/)) {
			return 'логин не может содержать русскине сииволы'
		}
		return true
	}
}