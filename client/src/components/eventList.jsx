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

      <div className="grid max-w-screen-2xl w-full grid-cols-4 p-7 gap-3 ">
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

export function EventCard({ image_url, eventName, id, price, location, Date }) {
  return (
    <Link className="flex flex-col" href={"/events/" + id}>
      <img
        src={image_url}
        className=" max-h-[154px] h-full max-w-[212px] w-full"
        alt=""
      />
      <div className="p-5 w-full h-full flex flex-col justify-between gap-2 ">
        <div className=" font-bold w-full "> {eventName}</div>
        <div className=""> {location}</div>
        <div className=""> {Date}</div>

        <div className="text-[#249C58] font-semibold  ">
          IDR {Number(price).toLocaleString()}
        </div>
      </div>
    </Link>
  );
}
