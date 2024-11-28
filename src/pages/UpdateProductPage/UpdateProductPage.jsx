import tw from "twin.macro";
import { EditProductForm } from "../../components/EditProductForm/EditProductForm";
import { useParams } from "react-router-dom";

export const UpdateProductPage = () => {
  const { id } = useParams();
  return (
    <div>
      <h1 tw="text-4xl text-center font-bold my-4">Actualizar Producto</h1>
      <EditProductForm productId={id} />
    </div>
  )
}