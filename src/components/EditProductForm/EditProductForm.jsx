import tw from "twin.macro";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { GetProductById, UpdateProduct, UpdateImageProduct } from "../../api/ProductListProvider/ProductListProvider";
import { getCategories } from "../../api/CategoryProvider/CategoryProvider";
import { getCategoryWithSubcategories } from "../../api/SubcategoryProvider/SubcategoryProvider";
import { useNavigate } from "react-router-dom";

export const EditProductForm = ({productId}) => {
  const navigate = useNavigate();
  const [updateProduct, setUpdateProduct] = useState({
    name: "",
    description: "",
    brand: "",
    price: 0,
    image: ""
  });
  const [errorForm, setErrorForm] = useState({
    name: "",
    description: "",
    globalError: "",
    price: ""
  });
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const [image, setImage] = useState(null);
  const [showInputImage, setShowInputImage] = useState(false);
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    getProduct(productId);
  }, [])

  useEffect(() => {
    if(selectCategory === "") return;
    fetchSubCategories();
  }, [selectCategory])

  const getProduct = async(productId) => {
    try {
      const response = await GetProductById(productId);
      setUpdateProduct({name: response.name, description: response.description, brand: response.brand, price: response.price, image: response.image});
      setSelectCategory(response.categoryId._id);
      setSelectSubCategory(response.subCategoryId._id);
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  }

  const fetchCategories = async() => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchSubCategories = async() => {
    const data = await getCategoryWithSubcategories(selectCategory);
    setSubCategories(data.subcategories);
  }

  const handleUpdate = async(e) => {
    e.preventDefault();
    if(isNaN(updateProduct.price) || updateProduct.price <= 0) {
      setErrorForm((prevState) => ({...prevState, price: "Precio no es válido"}))
      return;
    }else {
      setErrorForm((prevState) => ({...prevState, price: ""}));
    }

    if(updateProduct.description.trim() === "" || updateProduct.brand.trim() === "" || selectCategory === "" || selectSubCategory === "") {
      setErrorForm((prevState) => ({...prevState, globalError: "Todos los campos son obligatorios"}))
      return;
    }

    try {
      const data = {
        ...updateProduct,
        categoryId: selectCategory,
        subCategoryId: selectSubCategory
      };
      await UpdateProduct(productId, data);
      alert("Producto actualizado con éxito");
      navigate("/dashboard/products");
    } catch (error) {
      const errors = JSON.parse(error.message);
      let newState = {};
      if(Array.isArray(errors)) {
        errors.forEach((field) => {
          const fieldName = field.path;
          newState[fieldName] = field.msg;
        })
        setErrorForm(newState)
      }
    }
  }

  const handleUpdateImage = async () => {
    if(!showInputImage || image === null) {
      setShowInputImage(true);
      return;
    }
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await UpdateImageProduct(productId, formData);
      alert("Imagen actualizada correctamente");
      setShowInputImage(false);
      getProduct(response);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }

  const handleImage = (e) => {
    const typeImage = e.target.files[0].type.split("/")[1];
    const typesAllowed = ["jpg", "jpeg", "png", "webp"];
    if(!typesAllowed.includes(typeImage)) {
      setImageError("Formato de imagen no permitido");
      return;
    }
    setImage(e.target.files[0])
    setImageError("");
  }

  return (
    <div tw="flex justify-around">
      <form onSubmit={handleUpdate} tw="w-1/2 border-2 border-transparent rounded-md bg-white h-auto px-4 py-6">
        <div tw="w-full my-3">
          <input
            type="text"
            value={updateProduct?.name}
            disabled
            tw="w-full bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-3" />
        </div>
        <div tw="w-full my-3">
          <input
            type="text"
            required
            value={updateProduct?.description}
            onChange={(e) => setUpdateProduct({...updateProduct, description: e.target.value})}
            placeholder="Descripción del producto"
            tw="w-full bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-3" />
            {errorForm.description && <p tw="text-red-500 text-sm">{errorForm.description}</p>}
        </div>
        <div tw="w-full my-3">
          <input
            type="text"
            required
            value={updateProduct?.brand}
            placeholder="Marca del producto"
            onChange={(e) => setUpdateProduct({...updateProduct, brand: e.target.value})}
            tw="w-full bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-3" />
        </div>
        <div tw="w-full my-3">
          <input
            type="text"
            required
            value={updateProduct?.price}
            placeholder="Precio del producto"
            onChange={(e) => setUpdateProduct({...updateProduct, price: Number(e.target.value)})}
            tw="w-full bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-3" />
            {errorForm.price && <p tw="text-red-500 text-sm">{errorForm.price}</p>}
        </div>
        <div tw="w-full my-3 flex gap-8">
          <select
            onChange={(e) => setSelectCategory(e.target.value)}
            tw="w-full bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-3"
            value={selectCategory}
            >
            {
              categories?.map((category) => (
                <option tw="text-center" key={category?._id} value={category?._id}>{category?.category}</option>
              ))
            }
          </select>
          <select
            tw="w-full bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-3"
            onChange= {(e) => setSelectSubCategory(e.target.value)}
            value={selectSubCategory}
            >
            {
              subCategories?.map((subcategory) =>(
                <option key={subcategory?._id} value={subcategory?._id}>{subcategory?.subcategory}</option>
              ))
            }
          </select>
        </div>
        {errorForm?.globalError && <div tw="w-full my-3 flex text-red-400">{errorForm?.globalError}</div>}
        <div tw="w-full my-3 flex gap-8">
          <button tw="w-48 bg-[#042f40] text-white border-transparent text-sm rounded-md py-3 px-2">
            Actualizar
          </button>
          <Link to="/dashboard/products" tw="w-48 bg-[#065473] text-white inline-block border-transparent text-sm rounded-md py-3 px-2 text-center">
            Volver
          </Link>
        </div>
      </form>
      <div tw="flex flex-col items-center gap-2 justify-center">
        {
          !showInputImage && <div tw="w-[300px]"><img width="400px" tw="object-contain" src={`http://localhost:3000${updateProduct.image}`} alt="Imagen del producto" /></div>
        }
        {
          showInputImage && 
            <div tw="w-full my-3 flex flex-col">
              <input
              type="file"
              tw="bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-2 w-full"
              onChange={handleImage}
              />
              {imageError && <p tw="text-red-500">{imageError}</p>}
            </div>
        }

        <button onClick={handleUpdateImage} tw="w-48 bg-[#042f40] text-white border-transparent text-sm rounded-md py-3 px-2 text-center">
            Actualizar imagen
          </button>
      </div>
    </div>
  )
}
