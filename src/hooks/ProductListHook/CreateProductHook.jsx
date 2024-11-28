import { useState, useEffect } from "react"
import { getCategories } from "../../api/CategoryProvider/CategoryProvider";
import { getCategoryWithSubcategories } from "../../api/SubcategoryProvider/SubcategoryProvider";
import { CreateProduct } from "../../api/ProductListProvider/ProductListProvider";

const UseCreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const [errorImage, setErrorImage] = useState("");
  const [errorForm, setErrorForm] = useState({
    name: "",
    description: "",
    globalError: "",
    price: ""
  });
  const [createProduct, setCreateProduct] = useState({
    name: "",
    description: "",
    brand: "",
    price: 0,
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, [])

  useEffect(() => {
    if(selectCategory === "") return;
    fetchSubCategories();
  }, [selectCategory])

  const fetchCategories = async() => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchSubCategories = async() => {
    const data = await getCategoryWithSubcategories(selectCategory);
    setSubCategories(data.subcategories);
  }

  const handleCreateProduct = async(e, setIsModelOpen, setProducts) => {
    e.preventDefault();
    if(isNaN(createProduct.price) || createProduct.price <= 0) {
      setErrorForm((prevState) => ({...prevState, price: "Precio no es válido"}))
      return;
    }else {
      setErrorForm((prevState) => ({...prevState, price: ""}));
    }
    
    if(createProduct.name.trim() === "" || createProduct.description.trim() === "" || createProduct.brand.trim() === "" || selectCategory === "" || selectSubCategory === "" || image === null ) {
      setErrorForm((prevState) => ({...prevState, globalError: "Todos los campos son obligatorios"}))
      return;
    }


    console.log(selectSubCategory, selectCategory, createProduct, image);
    setErrorForm("");

    const formData = new FormData();
    formData.append("name", createProduct.name);
    formData.append("description", createProduct.description);
    formData.append("brand", createProduct.brand);
    formData.append("price", createProduct.price);
    formData.append("categoryId", selectCategory);
    formData.append("subCategoryId", selectSubCategory);
    formData.append("image", image);

    try {
      const response = await CreateProduct(formData);
      console.log(response);
      setCreateProduct({
        name: "",
        description: "",
        brand: "",
        price: 0,});

      setCategories([]);
      setSubCategories([]);
      setSelectCategory("");
      setSelectSubCategory("");
      setImage(null);
      alert("Producto agregado correctamente");
      setErrorForm({name: "", description: "", globalError: "", price: ""});
      setIsModelOpen(false);
      setProducts((prevState) => ([...prevState, response]));
    } catch (error) {
      const errors = JSON.parse(error.message);
      let newState = {};
      if(Array.isArray(errors)) {
        errors.forEach((field) => {
          const fieldName = field.path;
          newState[fieldName] = field.msg;
          console.log(newState)
        })
        setErrorForm(newState)
      }
    }

  }

  return { categories, handleCreateProduct, setSelectCategory,subCategories, setSelectSubCategory, setCreateProduct, createProduct, setImage, setSubCategories, errorImage, setErrorImage, errorForm, setErrorForm }
}

export default UseCreateProduct