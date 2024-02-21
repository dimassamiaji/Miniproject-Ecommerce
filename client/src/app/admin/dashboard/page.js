/** @format */
"use client";
import { useEffect, useRef, useState } from "react";

import { NavbarAdminComponent } from "@/components/navbar";

import Search from "@/assets/search.png";
import { useFormik } from "formik";
import { axiosInstance } from "@/axios/axios";
import AdminProductCard from "@/components/admin/adminCard";
import { useDebounce } from "use-debounce";

/** @format */
function Page() {
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);

  const [products, setProducts] = useState([]);
  const initalProduct = {
    product_name: "",
    price: 0,
    description: "",
    image_url: "",
    image: null,
    id: 0,
  };

  const formik = useFormik({
    initialValues: initalProduct,
    onSubmit: () => {
      console.log("test");
      save();
    },
  });

  const edit = async (id) => {
    const res = await axiosInstance().get("/products/" + id);
    const product = res.data.result;
    formik.setFieldValue("id", product.id);
    formik.setFieldValue("product_name", product.product_name);
    formik.setFieldValue("image_url", product.image_url);

    formik.setFieldValue("price", product.price);
    formik.setFieldValue("description", product.description);
  };
  const save = () => {
    console.log(formik.values);
    const form = new FormData();
    form.append("product_name", formik.values.product_name);
    form.append("image_url", formik.values.image_url);
    form.append("image", formik.values.image);
    form.append("price", formik.values.price);
    form.append("description", formik.values.description);

    if (formik.values.id) {
      axiosInstance()
        .patch("/products/" + formik.values.id, form)
        .then(() => {
          alert("data berhasil diedit");
          fetchProducts();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axiosInstance();
      axiosInstance()
        .post("/products/", form)
        .then(() => {
          alert("data berhasil ditambahkan");
          fetchProducts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    formik.resetForm();
  };

  const hapus = (id) => {
    if (window.confirm("apakah anda yakin menghapus product id " + id + "?"))
      axiosInstance()
        .delete("/products/" + id)
        .then(() => {
          alert(`id ${id} berhasil dihapus`);
          fetchProducts();
        })
        .catch((err) => console.log(err));
  };

  const fetchProducts = () => {
    axiosInstance()
      .get("/products/", {
        params: {
          product_name: search,
        },
      })
      .then((res) => {
        setProducts(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  const renderFile = (e) => {
    console.log(e.target.files[0]);
    formik.setFieldValue("image", e.target.files[0]);
    // formik.setFieldValue(
    //   "image_url",
    //   window.URL.createObjectURL(e.target.files[0])
    // );
  };

  useEffect(() => {
    fetchProducts();
  }, [value]);

  const upload = useRef(null);
  return (
    <>
      <NavbarAdminComponent />
      <div className="w-full">
        <div className="flex flex-col justify-center  max-w-[1000px] w-full items-center m-auto  ">
          <div className="py-5 w-full">
            <div className="flex px-3 items-center gap-3  border-gray-300 border-b w-72  p-2">
              <img src={Search} alt="" className=" w-3 h-3" />
              <input
                type="text"
                placeholder="Type any products here"
                className=" outline-none             "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <table className="w-full">
            <tr className=" text-center ">
              <th>IMAGE</th>

              <th>PRODUCT NAME</th>
              <th>PRICE</th>
            </tr>
            {products.map((product, key) => (
              <AdminProductCard
                {...product}
                key={key}
                edit={() => edit(product.id)}
                hapus={() => hapus(product.id)}
              />
            ))}
          </table>
          <div className="mt-16 w-full py-3">
            <form id="form" action="" onSubmit={formik.handleSubmit}>
              <h1 className="font-bold text-2xl mb-3">Add Product</h1>
              <div className="flex flex-col gap-1 ">
                <table>
                  <tr>
                    <td> Product Name</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Product Name"
                        className="border p-1  w-96 "
                        required
                        id="product_name"
                        value={formik.values.product_name}
                        onChange={formik.handleChange}
                        // onChange={(e) => {
                        //   formik.setFieldValue("product_name", e.target.value);
                        // }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td> Product Image</td>
                    <td>
                      <input
                        type="file"
                        placeholder="Image URL"
                        className="border p-1  w-96 hidden"
                        id="image_url"
                        onChange={(e) => renderFile(e)}
                        ref={upload}
                      />
                      <button
                        className="bg-full bg-green-500  w-32 text-white rounded-md "
                        type="button"
                        onClick={() => {
                          upload.current.click();
                        }}
                      >
                        upload
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td> Product Price</td>
                    <td>
                      <input
                        type="number"
                        placeholder="Product Price"
                        className="border p-1 w-96"
                        min={50000}
                        required
                        id="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td> Product Description</td>
                    <td>
                      <textarea
                        type="text"
                        placeholder="Description"
                        className="border p-1 w-96"
                        required
                        value={formik.values.description}
                        id="description"
                        onChange={formik.handleChange}
                      />
                    </td>
                  </tr>
                </table>
                <tr className="flex gap-2">
                  <button
                    className="bg-black text-white p-1 px-2 rounded-md w-24 "
                    type="submit"
                  >
                    submit
                  </button>
                  <button
                    className="bg-black text-white p-1 px-2 rounded-md w-24 "
                    onClick={() => formik.resetForm()}
                  >
                    clear
                  </button>
                </tr>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
