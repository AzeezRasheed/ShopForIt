import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/Loader/Spinner";
import {
  getProduct,
  getProducts,
  useIsLoading,
  useGetProduct,
  updateProduct,
} from "../../../redux/product/productSlice";
// import { updateProduct } from "../../../services/productServices";

function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useIsLoading();

  const productEdit = useGetProduct();

  const [product, setProduct] = useState(productEdit);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);

    setImagePreview(
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
    );

    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    );
  }, [productEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product?.name);

    formData.append("category", product?.category);
    formData.append("quantity", product?.quantity);
    formData.append("price", product?.price);
    formData.append("description", description);
    if (productImage) {
      formData.append("image", productImage);
    }

    console.log(...formData);

    await dispatch(updateProduct({ formData, id }));
    await dispatch(getProducts());
    navigate("/dashboard");
  };
  return (
    <div className="flex flex-col max-w-[500px] gap-2 shadow-lg shadow-indigo-500/50 bg-white p-2 lg:p-4">
      <h2 className="font-semi-bold text-[30px] font-serif text-center md:text-start lg:text-start ">
        Edit Product
      </h2>
      {isLoading && <Spinner />}
      <form onSubmit={saveProduct} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 ">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Product Image :
          </label>
          <code className="--color-dark">
            Supported Formats: jpg, jpeg, png
          </code>
          <input
            type="file"
            name="image"
            onChange={(e) => handleImageChange(e)}
            className="appearance-none max-w-lg block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          />

          {imagePreview != null ? (
            <div className="image-preview transition flex flex-wrap  py-3 mb-3 ">
              <img
                src={imagePreview}
                alt="product"
                className="max-w-full h-auto  shadow-lg"
              />
            </div>
          ) : (
            <p>No image set for this product.</p>
          )}
        </div>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Product Name :
        </label>
        <input
          type="text"
          placeholder="Product name"
          name="name"
          value={product?.name}
          onChange={handleInputChange}
          className="appearance-none block w-full max-w-lg bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        />

        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Product Category :
        </label>
        <input
          type="text"
          placeholder="Product Category"
          name="category"
          value={product?.category}
          onChange={handleInputChange}
          className="appearance-none block w-full max-w-lg bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        />

        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Product Price :
        </label>
        <input
          type="text"
          placeholder="Product Price"
          name="price"
          value={product?.price}
          onChange={handleInputChange}
          className="appearance-none block w-full max-w-lg bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        />

        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Product Quantity :
        </label>
        <input
          type="text"
          placeholder="Product Quantity"
          name="quantity"
          value={product?.quantity}
          onChange={handleInputChange}
          className="appearance-none block w-full max-w-lg bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        />

        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Product Description :
        </label>
        <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
          modules={EditProduct.modules}
          formats={EditProduct.formats}
          className="max-w-lg"
        />

        <div className="--my">
          <button
            type="submit"
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}

EditProduct.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
EditProduct.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default EditProduct;
// text-red-600
// text-green-600
