import tw from "twin.macro";
import  useCreateProduct from "../../hooks/ProductListHook/CreateProductHook";

export const CreateProductModal = ({setIsModelOpen, onClose, setProducts}) => {
  const { categories, handleCreateProduct, setSelectCategory,subCategories, setSelectSubCategory, createProduct, setCreateProduct, setImage, errorImage, setErrorImage, errorForm, setErrorForm } = useCreateProduct();

  const handleImage = (e) => {
    const typeImage = e.target.files[0].type.split("/")[1];
    const typesAllowed = ["jpg", "jpeg", "png", "webp"];
    if(!typesAllowed.includes(typeImage)) {
      setErrorImage("Formato de imagen no permitido");
      setErrorForm({name: "", description: "", globalError: ""});
      return;
    }
    setImage(e.target.files[0])
    setErrorImage("")
    console.log(e.target.files[0])
  }

  return (
    <div tw="fixed left-0 top-0 right-0 bottom-0 bg-[rgba(0, 0, 0, 0.8)] flex flex-col items-center justify-center">
      <form onSubmit={(e) => handleCreateProduct(e, setIsModelOpen, setProducts)} tw="w-1/2 border-2 border-transparent rounded-md bg-white h-auto px-4 py-6">
        <h2 tw="text-center text-2xl">Crear producto</h2>
        <div tw="w-full my-3">
          <input 
            type="text"
            onChange={(e) => setCreateProduct({...createProduct, name: e.target.value})}
            required 
            placeholder="Nombre del producto" tw="w-full bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-3" />
            {errorForm.name && <p tw="text-red-500 text-sm">{errorForm.name}</p>}
        </div>
        <div tw="w-full my-3">
          <input 
            type="text" 
            required
            onChange={(e) => setCreateProduct({...createProduct, description: e.target.value})}
            placeholder="Descripción del producto" 
            tw="w-full bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-3" />
            {errorForm.description && <p tw="text-red-500 text-sm">{errorForm.description}</p>}
        </div>
        <div tw="w-full my-3">
          <input 
            type="text" 
            required 
            placeholder="Marca del producto" 
            onChange={(e) => setCreateProduct({...createProduct, brand: e.target.value})}
            tw="w-full bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-3" />
        </div>
        <div tw="w-full my-3">
          <input 
            type="text" 
            required 
            placeholder="Precio del producto" 
            onChange={(e) => setCreateProduct({...createProduct, price: Number(e.target.value)})}
            tw="w-full bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-3" />
            {errorForm.price && <p tw="text-red-500 text-sm">{errorForm.price}</p>}
        </div>
        <div tw="w-full my-3 flex gap-8">
          <select onChange={(e) => setSelectCategory(e.target.value)} tw="w-full bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-3">
            <option tw="text-center" defaultValue="">-- Seleccionar una categoria --</option>
            {
              categories.map((category) => (
                <option key={category._id} value={category._id}>{category.category}</option>
              ))
            }
          </select>
          <select 
            tw="w-full bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-3" 
            disabled={subCategories.length === 0}
            onChange= {(e) => setSelectSubCategory(e.target.value)}
            >
            <option tw="text-center" defaultValue="">-- Seleccionar una subcategoria --</option>
            {
              subCategories.map((subcategory) =>(
                <option key={subcategory._id} value={subcategory._id}>{subcategory.subcategory}</option>
              ))
            }
          </select>
        </div>
        <div tw="w-full my-3 flex flex-col">
          <input 
            type="file" 
            tw="bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-2 w-1/2"
            onChange={handleImage}
            />
            {errorImage && <p tw="text-red-500">{errorImage}</p>}
        </div>
        {errorForm.globalError && <div tw="w-full my-3 flex text-red-400">{errorForm.globalError}</div>}
        <div tw="w-full my-3 flex gap-8">
          <button tw="w-full bg-[#042f40] text-white border-transparent text-sm rounded-md py-3 px-2">
            Crear
          </button>
          <button onClick={onClose} tw="w-full bg-[#0568a6] text-sm border-transparent rounded-md py-3 px-2 text-white">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}