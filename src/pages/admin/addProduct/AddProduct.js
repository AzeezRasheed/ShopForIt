import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, FieldArray, useFormik } from "formik";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  getProducts,
  useIsLoading,
  createProduct,
} from "../../../redux/product/productSlice";
import Spinner from "../../../components/Loader/Spinner";
import Stack from "../../../components/Stack/Stack";
import Typography from "../../../components/Typography/Typography";
import { IoMdRemove } from "react-icons/io";
import { MdAddBox } from "react-icons/md";
import { addProductSchema } from "../../../helper/schema/schema";

const initialValues = {
  images: [],
  title: "",
  oldPrice: "",
  newPrice: "",
  collections: "",
  event: "",
  descriptions: [
    { name: "", value: "" },
    { name: "", value: "" },
  ],
  additionalInfo: [
    { name: "", value: "" },
    { name: "", value: "" },
  ],
  categories: ["", ""],
};

function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useIsLoading();
  const [imagePreviews, setImagePreviews] = useState([]);

  const onSubmit = async (values) => {
    const data = await dispatch(createProduct(values));
    await dispatch(getProducts());
    data && navigate("/admin/dashboard");
  };

  const formik = useFormik({
    initialValues,
    validationSchema: addProductSchema,
    onSubmit,
  });

  const {
    errors,
    touched,
    values,
    // isValid/,
    setValues,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = formik;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFieldValue("images", files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  return (
    <div className="flex flex-col max-w-[500px] gap-2 shadow-lg shadow-indigo-500/50 bg-white p-2 lg:p-4">
      <h2 className="font-semi-bold text-[30px] font-serif text-center md:text-start lg:text-start ">
        Add Product
      </h2>
      {isLoading && <Spinner />}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full ">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <div className="flex flex-col gap-2 items-center">
            {/* Image */}
            <div className="flex flex-col gap-2 w-full ">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                Product Image :
              </label>
              <code className="--color-dark">
                Supported Formats: jpg, jpeg, png
              </code>
              <code className="--color-dark">
                You can choose multiple images
              </code>
              <input
                type="file"
                name="images"
                onChange={handleImageChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                multiple // Allow multiple file selection
              />

              {imagePreviews.length > 0 ? (
                <div className="image-preview transition flex flex-wrap py-3 mb-3">
                  {imagePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`product-${index}`}
                      className="max-w-full h-auto shadow-lg"
                    />
                  ))}
                </div>
              ) : (
                <p>No images set for this product.</p>
              )}
            </div>

            {/* Title */}
            <div className="flex flex-col gap-1 items-start text-start w-full">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Product Title :
              </label>
              <div className="w-full flex flex-col  items-start">
                <Field
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  name={`title`}
                  value={values.title}
                  placeholder={`Product Title`}
                  onChange={handleChange}
                  error={touched.title && Boolean(errors.title)}
                  onBlur={handleBlur}
                />
                {touched.title && errors.title ? (
                  <Typography as={"span"} className="text-sm text-red-500">
                    {errors.title}
                  </Typography>
                ) : null}
              </div>
            </div>

            {/* Old Price */}
            <div className="flex flex-col gap-1 items-start text-start w-full">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Old Price :
              </label>
              <div className="w-full flex flex-col  items-start">
                <Field
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  name={`oldPrice`}
                  type="number"
                  value={values.oldPrice}
                  placeholder={`Product old price `}
                  onChange={handleChange}
                  error={touched.oldPrice && Boolean(errors.oldPrice)}
                  onBlur={handleBlur}
                />
                {touched.oldPrice && errors.oldPrice ? (
                  <Typography as={"span"} className="text-sm text-red-500">
                    {errors.oldPrice}
                  </Typography>
                ) : null}
              </div>
            </div>

            {/* New Price */}
            <div className="flex flex-col gap-1 items-start text-start w-full">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                New Price :
              </label>
              <div className="w-full flex flex-col  items-start">
                <Field
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  name={`newPrice`}
                  type="number"
                  value={values.newPrice}
                  placeholder={`Product new price `}
                  onChange={handleChange}
                  error={touched.newPrice && Boolean(errors.newPrice)}
                  onBlur={handleBlur}
                />
                {touched.newPrice && errors.newPrice ? (
                  <Typography as={"span"} className="text-sm text-red-500">
                    {errors.newPrice}
                  </Typography>
                ) : null}
              </div>
            </div>

            {/* Collection */}
            <div className="flex flex-col gap-1 items-start text-start w-full">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Collection type :
              </label>
              <div className="w-full flex flex-col  items-start">
                <Field
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  name={`collections`}
                  value={values.collections}
                  placeholder={`Product collection type `}
                  onChange={handleChange}
                  error={touched.collections && Boolean(errors.collections)}
                  onBlur={handleBlur}
                />
                {touched.collections && errors.collections ? (
                  <Typography as={"span"} className="text-sm text-red-500">
                    {errors.collections}
                  </Typography>
                ) : null}
              </div>
            </div>

            {/* Event */}
            <div className="flex flex-col gap-1 items-start text-start w-full">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Event type :
              </label>
              <div className="w-full flex flex-col  items-start">
                <code className="--color-dark">
                  The Enum value you are allowed to input is Easter and Black
                  Friday
                </code>
                <Field
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  name={`event`}
                  value={values.event}
                  placeholder={`Product event type `}
                  onChange={handleChange}
                  error={touched.event && Boolean(errors.event)}
                  onBlur={handleBlur}
                />
                {touched.event && errors.event ? (
                  <Typography as={"span"} className="text-sm text-red-500">
                    {errors.event}
                  </Typography>
                ) : null}
              </div>
            </div>

            {/* Descriptions */}
            <FieldArray
              name="descriptions"
              render={(arrayHelpers) => (
                <div className="w-full flex mb-1">
                  <Stack
                    direction="row"
                    alignItems="baseline"
                    justifyContent="spacebetween"
                    className="gap-4 flex-wrap"
                  >
                    {values?.descriptions?.map((description, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-2 items-start w-full "
                      >
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                          Description :
                        </label>
                        <div
                          className="w-full flex flex-col items-start"
                          key={index}
                        >
                          <div className="flex flex-col gap-2 items-start mb-2 w-full">
                            <Field
                              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                              name={`descriptions[${index}].name`}
                              value={description.name}
                              placeholder="Input description name"
                              onChange={handleChange}
                              error={
                                touched.descriptions &&
                                Boolean(errors.descriptions?.[index]?.name)
                              }
                              onBlur={handleBlur}
                            />
                            {touched.descriptions?.[index]?.name &&
                            errors.descriptions?.[index]?.name ? (
                              <Typography
                                as={"span"}
                                className="text-sm text-red-500"
                              >
                                {errors.descriptions[index]?.name}
                              </Typography>
                            ) : null}
                          </div>
                          <div className="flex flex-col gap-2 items-start mb-2  w-full">
                            <Field
                              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                              name={`descriptions[${index}].value`}
                              value={description.value}
                              placeholder="Input description value"
                              onChange={handleChange}
                              error={
                                touched.descriptions &&
                                Boolean(errors.descriptions?.[index]?.value)
                              }
                              onBlur={handleBlur}
                            />
                            {touched.descriptions?.[index]?.value &&
                            errors.descriptions?.[index]?.value ? (
                              <Typography
                                as={"span"}
                                className="text-sm text-red-500"
                              >
                                {errors.descriptions[index]?.value}
                              </Typography>
                            ) : null}
                          </div>
                          {index > 0 && (
                            <Stack
                              direction="row"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              {index > 1 ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    arrayHelpers.remove(index);
                                    setValues({
                                      ...values,
                                      descriptions: values.descriptions.filter(
                                        (_, i) => i !== index
                                      ),
                                    });
                                  }}
                                >
                                  <IoMdRemove size={24} />
                                </button>
                              ) : (
                                <div></div>
                              )}
                              <button
                                type="button"
                                onClick={() => {
                                  const newIndex = values?.descriptions?.length;
                                  arrayHelpers.push({ name: "", value: "" });
                                  handleChange({
                                    target: {
                                      name: `descriptions[${newIndex}]`,
                                      value: { name: "", value: "" },
                                    },
                                  });
                                }}
                              >
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  className="gap-0.5"
                                >
                                  <MdAddBox
                                    size={24}
                                    className="text-[#22237F]"
                                  />
                                  <Typography
                                    as={"span"}
                                    className="font-Inter italic text-[#22237F] text-[14px] leading-[4px] font-normal "
                                  >
                                    add Description
                                  </Typography>
                                </Stack>
                              </button>
                            </Stack>
                          )}
                        </div>
                      </div>
                    ))}
                  </Stack>
                </div>
              )}
            />

            {/* Additional Info */}
            <FieldArray
              name="additionalInfo"
              render={(arrayHelpers) => (
                <div className="w-full flex mb-1">
                  <Stack
                    direction="row"
                    alignItems="baseline"
                    justifyContent="spacebetween"
                    className="gap-4 flex-wrap"
                  >
                    {values?.additionalInfo?.map((info, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-2 items-start w-full "
                      >
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                          Additional Information :
                        </label>
                        <div
                          className="w-full flex flex-col items-start"
                          key={index}
                        >
                          <div className="flex flex-col gap-2 items-start mb-2 w-full">
                            <Field
                              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                              name={`additionalInfo[${index}].name`}
                              value={info.name}
                              placeholder="Input additional information name"
                              onChange={handleChange}
                              error={
                                touched.additionalInfo &&
                                Boolean(errors.additionalInfo?.[index]?.name)
                              }
                              onBlur={handleBlur}
                            />
                            {touched.additionalInfo?.[index]?.name &&
                            errors.additionalInfo?.[index]?.name ? (
                              <Typography
                                as={"span"}
                                className="text-sm text-red-500"
                              >
                                {errors.additionalInfo[index]?.name}
                              </Typography>
                            ) : null}
                          </div>
                          <div className="flex flex-col gap-2 items-start mb-2  w-full">
                            <Field
                              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                              name={`additionalInfo[${index}].value`}
                              value={info.value}
                              placeholder="Input additional information  value"
                              onChange={handleChange}
                              error={
                                touched.additionalInfo &&
                                Boolean(errors.additionalInfo?.[index]?.value)
                              }
                              onBlur={handleBlur}
                            />
                            {touched.additionalInfo?.[index]?.value &&
                            errors.additionalInfo?.[index]?.value ? (
                              <Typography
                                as={"span"}
                                className="text-sm text-red-500"
                              >
                                {errors.additionalInfo[index]?.value}
                              </Typography>
                            ) : null}
                          </div>
                          {index > 0 && (
                            <Stack
                              direction="row"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              {index > 1 ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    arrayHelpers.remove(index);
                                    setValues({
                                      ...values,
                                      additionalInfo:
                                        values.additionalInfo.filter(
                                          (_, i) => i !== index
                                        ),
                                    });
                                  }}
                                >
                                  <IoMdRemove size={24} />
                                </button>
                              ) : (
                                <div></div>
                              )}
                              <button
                                type="button"
                                onClick={() => {
                                  const newIndex =
                                    values?.additionalInfo?.length;
                                  arrayHelpers.push({ name: "", value: "" });
                                  handleChange({
                                    target: {
                                      name: `additionalInfo[${newIndex}]`,
                                      value: { name: "", value: "" },
                                    },
                                  });
                                }}
                              >
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  className="gap-0.5"
                                >
                                  <MdAddBox
                                    size={24}
                                    className="text-[#22237F]"
                                  />
                                  <Typography
                                    as={"span"}
                                    className="font-Inter italic text-[#22237F] text-[14px] leading-[4px] font-normal "
                                  >
                                    add additional Information
                                  </Typography>
                                </Stack>
                              </button>
                            </Stack>
                          )}
                        </div>
                      </div>
                    ))}
                  </Stack>
                </div>
              )}
            />

            {/* Categories */}
            <FieldArray
              name="categories"
              render={(arrayHelpers) => (
                <div className="w-full">
                  <Stack
                    direction="row"
                    alignItems="baseline"
                    justifyContent="spacebetween"
                    className="gap-4 flex-wrap px-0 "
                  >
                    {values?.categories?.map((category, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-2 items-start w-full "
                      >
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                          Stretched Length (Inches) :
                        </label>
                        <div
                          className="w-full flex flex-col  items-start "
                          key={index}
                        >
                          <Field
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-0.5 leading-tight focus:outline-none focus:bg-white"
                            name={`categories[${index}]`}
                            type="number"
                            value={category[index]}
                            placeholder={`Input inches`}
                            onChange={handleChange}
                            error={
                              touched.categories && Boolean(errors.categories)
                            }
                            onBlur={handleBlur}
                          />
                          {touched.categories && errors.categories ? (
                            <Typography
                              as={"span"}
                              className="text-sm text-red-500"
                            >
                              {errors.categories[index]}
                            </Typography>
                          ) : null}
                          {index > 0 && (
                            <Stack
                              direction="row"
                              alignItems="center"
                              justifyContent="spacebetween"
                            >
                              {index > 1 ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    arrayHelpers.remove(index);
                                    setValues({
                                      ...values,
                                      categories: values.categories.filter(
                                        (_, i) => i !== index
                                      ),
                                    });
                                  }}
                                >
                                  <IoMdRemove size={24} />
                                </button>
                              ) : (
                                <div></div>
                              )}
                              <button
                                type="button"
                                onClick={() => {
                                  const newIndex = values?.categories?.length;
                                  arrayHelpers.push("");
                                  handleChange({
                                    target: {
                                      name: `categories[${newIndex}]`,
                                      value: "",
                                    },
                                  });
                                }}
                              >
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  className="gap-0.5"
                                >
                                  <MdAddBox
                                    size={24}
                                    className="text-[#22237F]"
                                  />
                                  <Typography
                                    as={"span"}
                                    className="font-Inter italic text-[#22237F] text-[14px] leading-[4px] font-normal "
                                  >
                                    add category
                                  </Typography>
                                </Stack>
                              </button>
                            </Stack>
                          )}
                        </div>
                      </div>
                    ))}
                  </Stack>
                </div>
              )}
            />

            <div className="--my">
              <button
                type="submit"
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              >
                Add Product
              </button>
            </div>
          </div>
        </Formik>
      </form>
    </div>
  );
}
AddProduct.modules = {
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
AddProduct.formats = [
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

export default AddProduct;
