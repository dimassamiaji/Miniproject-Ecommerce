"use client";
import { useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../axios/axios";
import Search from "../assets/search.png";
import Link from "next/link";
import Image from "next/image";
import { useDebounce } from "use-debounce";

function EventListComponent() {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(4); // Jumlah event per halaman

  const [value] = useDebounce(search, 500);

  const handleFilter = (filterValue) => {
    if (filterValue === "All") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(
        events.filter(
          (event) => event.location.toLowerCase() === filterValue.toLowerCase()
        )
      );
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [value]);

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

  // Memfilter events berdasarkan pencarian
  useEffect(() => {
    setFilteredEvents(
      events.filter((event) =>
        event.eventName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, events]);

  // Mendapatkan events untuk halaman yang sedang aktif
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full">
      <div className=" mt-5 px-7 max-w-screen-2xl w-full">
        <div className="flex px-3 items-center gap-3 border-gray-300 border-b w-72 p-2">
          <Image src={Search} alt="" className=" w-3 h-3" />
          <input
            type="text"
            placeholder="Type any events here"
            className=" outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* Filter Button */}
        <div className="flex justify-center mt-5 space-x-4">
          <button onClick={() => handleFilter("All")} className="btn-filter">
            All
          </button>
          <button
            onClick={() => handleFilter("Jakarta")}
            className="btn-filter"
          >
            Jakarta
          </button>
          <button onClick={() => handleFilter("Bali")} className="btn-filter">
            Bali
          </button>
          <button
            onClick={() => handleFilter("Semarang")}
            className="btn-filter"
          >
            Semarang
          </button>
          <button
            onClick={() => handleFilter("Palembang")}
            className="btn-filter"
          >
            Palembang
          </button>
          <button
            onClick={() => handleFilter("Boyolali")}
            className="btn-filter"
          >
            Boyolali
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 ">
        {currentEvents.map((event, key) => (
          <EventCard {...event} key={key} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <ul className="flex gap-2">
          {Array.from(
            { length: Math.ceil(filteredEvents.length / eventsPerPage) },
            (_, i) => (
              <li
                key={i}
                onClick={() => paginate(i + 1)}
                className="cursor-pointer"
              >
                {i + 1}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default EventListComponent;

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export function EventCard({ image_url, eventName, id, price, location, Date }) {
  return (
    <Link
      className="bg-white rounded-lg overflow-hidden shadow-md"
      href={"/events/" + id}
    >
      <img
        src={image_url}
        className=" max-h-[384px] h-full max-w-[384px] w-full"
        alt={eventName}
        width={300}
        height={200}
        objectFit="cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{eventName}</h2>
        <p className="text-gray-600 mb-2">
          {location} | {formatDate(Date)}
        </p>
        <p className="text-gray-600 mb-4">
          IDR {Number(price).toLocaleString()}
        </p>
        <button className="bg-blue-500 text-white w-full px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Buy Tickets
        </button>
      </div>
        
    </Link>
  );
}
