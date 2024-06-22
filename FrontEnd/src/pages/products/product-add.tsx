import { IProduct } from "../../api/interfaces/product/product.interface";
import Form from "../../components/form/form";
import ProfilePage from "../profile-page";

export default function ProductAdd() {
	async function handleSubmitAsync(values: IProduct) {
		console.log(values);
	}

	return (
		<ProfilePage>
			<Form<IProduct>
				defaultValues={{
					description: "",
					imageId: "",
					name: "",
					price: 0,
				}}
				fields={(builder) =>
					builder
						.image({ name: "imageId", required: true })
						.text({ name: "name", label: "Наименование",  required: true  })
						.text({ name: "description",label: "Описание",  required: true  })
				}
				minHeight={500}
				onSubmitAsync={handleSubmitAsync}
			/>
		</ProfilePage>
	);
}
