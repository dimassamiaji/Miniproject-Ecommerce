/** @format */
"use client";
import { useEffect, useRef, useState } from "react";
import { NavbarAdminComponent } from "@/components/navbar";
import Search from "@/assets/search.png";
import { useFormik } from "formik";
import { axiosInstance } from "@/axios/axios";
import AdminEventCard from "@/components/admin/adminCard";
import { useDebounce } from "use-debounce";
import moment from "moment";

/** @format */
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg max-w-2xl w-full mx-4">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-2 text-2xl font-bold"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

function Page() {
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const initalEvent = {
    eventName: "",
    price: 0,
    description: "",
    image_url: "",
    image: null,
    eventDate: new Date(),
    location,
    id: 0,
  };

  const formik = useFormik({
    initialValues: initalEvent,
    onSubmit: () => {
      console.log("test");
      save();
    },
  });

  const edit = async (id) => {
    const res = await axiosInstance().get("/events/" + id);
    const event = res.data.result;
    formik.setFieldValue("id", event.id);
    formik.setFieldValue("eventName", event.eventName);
    formik.setFieldValue("image_url", event.image_url);
    formik.setFieldValue("price", event.price);
    formik.setFieldValue("description", event.description);
    formik.setFieldValue("location", event.location);
    formik.setFieldValue("eventDate", event.eventDate);
  };
  const save = () => {
    console.log(formik.values);
    const form = new FormData();
    form.append("eventName", formik.values.eventName);
    form.append("image_url", formik.values.image_url);
    form.append("image", formik.values.image);
    form.append("price", formik.values.price);
    form.append("description", formik.values.description);
    form.append("location", formik.values.location);
    form.append("eventDate", formik.values.eventDate);

    if (formik.values.id) {
      axiosInstance()
        .patch("/events/" + formik.values.id, form)
        .then(() => {
          alert("data berhasil diedit");
          fetchEvents();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axiosInstance();
      axiosInstance()
        .post("/events/", form)
        .then(() => {
          alert("data berhasil ditambahkan");
          fetchEvents();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    formik.resetForm();
  };

  const hapus = (id) => {
    if (window.confirm("apakah anda yakin menghapus event id " + id + "?"))
      axiosInstance()
        .delete("/events/" + id)
        .then(() => {
          alert(`id ${id} berhasil dihapus`);
          fetchEvents();
        })
        .catch((err) => console.log(err));
  };

  const fetchEvents = () => {
    axiosInstance()
      .get("/events/", {
        params: {
          eventName: search,
        },
      })
      .then((res) => {
        setEvents(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  const renderFile = (e) => {
    console.log(e.target.files[0]);
    formik.setFieldValue("image", e.target.files[0]);
    formik.setFieldValue(
      "image_url",
      window.URL.createObjectURL(e.target.files[0])
    );
  };

  useEffect(() => {
    fetchEvents();
  }, [value]);

  const upload = useRef(null);
  return (
    <>
      <NavbarAdminComponent />
      <div className="flex flex-col justify-center max-w-[1000px] w-full items-center m-auto  ">
        <div className="py-5 w-full">
          <div className="flex px-3 items-center gap-3  border-gray-300 border-b w-72  p-2">
            <img src={Search} alt="" className=" w-3 h-3" />
            <input
              type="text"
              placeholder="Type any events here"
              className=" outline-none             "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <table className="w-full">
          <tr className=" text-center ">
            <th>IMAGE</th>
            <th>EVENT NAME</th>
            <th>PRICE</th>
          </tr>
          {events.map((event, key) => (
            <AdminEventCard
              {...event}
              key={key}
              edit={() => edit(event.id)}
              hapus={() => hapus(event.id)}
            />
          ))}
        </table>

        <button
          onClick={handleOpenModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
        >
          Add Event
        </button>

        {/* Modal for adding an event */}
        <Modal isOpen={showModal} onClose={handleCloseModal}>
          <form id="form" onSubmit={formik.handleSubmit} className="space-y-4">
            <h1 className="font-bold text-2xl mb-3">Add Event</h1>
            <div className="flex flex-col gap-1 ">
              <table>
                <tr>
                  <td> Event Name</td>
                  <td>
                    <input
                      type="text"
                      placeholder="Event Name"
                      className="border p-1  w-96 "
                      required
                      id="eventName"
                      value={formik.values.eventName}
                      onChange={formik.handleChange}
                      // onChange={(e) => {
                      //   formik.setFieldValue("product_name", e.target.value);
                      // }}
                    />
                  </td>
                </tr>
                <tr>
                  <td> Event Image</td>
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
                  <td> Event Price</td>
                  <td>
                    <input
                      type="number"
                      placeholder="Event Price"
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
                  <td> Event Description</td>
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
                <tr>
                  <td>Event Location</td>
                  <td>
                    <select
                      className="border p-1 w-96"
                      required
                      value={formik.values.location}
                      id="location"
                      onChange={formik.handleChange}
                    >
                      <option value="">Select Location</option>
                      <option value="Jakarta">Jakarta</option>
                      <option value="Bandung">Bandung</option>
                      <option value="BSD">BSD</option>
                      <option value="Bali">Bali</option>
                      <option value="Surabaya">Surabaya</option>
                    </select>
                  </td>
                </tr>

                <tr>
                  <td> Event Date</td>
                  <td>
                    <input
                      type="date"
                      className="border p-1 w-96"
                      required
                      value={moment(formik.values.eventDate).format(
                        "YYYY-MM-DD"
                      )}
                      id="eventDate"
                      onChange={formik.handleChange}
                    />
                  </td>
                </tr>
              </table>
              <div className="flex gap-2">
                <button
                  className="bg-black text-white py-1 px-2 rounded-md w-24"
                  type="submit"
                >
                  submit
                </button>
                <button
                  type="button"
                  className="bg-black text-white py-1 px-2 rounded-md w-24"
                  onClick={() => {
                    formik.resetForm();
                    handleCloseModal(); // Close modal on form reset
                  }}
                >
                  clear
                </button>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default Page;
