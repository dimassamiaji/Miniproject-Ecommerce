"use client";
import { useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../axios/axios";
import Search from "../assets/search.png";
import Link from "next/link";
import Image from "next/image";
import { useDebounce } from "use-debounce";
import moment from "moment";

function EventListComponent() {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(4);

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

  useEffect(() => {
    setFilteredEvents(
      events.filter((event) =>
        event.eventName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, events]);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  // Define the Previous and Next page functions
  const goToPreviousPage = () =>
    setCurrentPage((currentPage) => Math.max(1, currentPage - 1));
  const goToNextPage = () =>
    setCurrentPage((currentPage) => Math.min(totalPages, currentPage + 1));

  const onFirstPage = currentPage === 1;
  const onLastPage = currentPage === totalPages;

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

        <div className="flex flex-wrap justify-center mt-5 gap-2 md:gap-4">
          <button
            onClick={() => handleFilter("All")}
            className="hover:underline hover:text-[#23A6F0] btn-filter px-2 py-1 text-xs md:text-sm md:px-4"
          >
            All
          </button>
          <button
            onClick={() => handleFilter("Jakarta")}
            className="hover:underline hover:text-[#23A6F0] btn-filter px-2 py-1 text-xs md:text-sm md:px-4"
          >
            Jakarta
          </button>
          <button
            onClick={() => handleFilter("Bandung")}
            className="hover:underline hover:text-[#23A6F0] btn-filter px-2 py-1 text-xs md:text-sm md:px-4"
          >
            Bandung
          </button>
          <button
            onClick={() => handleFilter("BSD")}
            className="hover:underline hover:text-[#23A6F0] btn-filter px-2 py-1 text-xs md:text-sm md:px-4"
          >
            BSD
          </button>
          <button
            onClick={() => handleFilter("Bali")}
            className="hover:underline hover:text-[#23A6F0] btn-filter px-2 py-1 text-xs md:text-sm md:px-4"
          >
            Bali
          </button>
          <button
            onClick={() => handleFilter("Surabaya")}
            className="hover:underline hover:text-[#23A6F0] btn-filter px-2 py-1 text-xs md:text-sm md:px-4"
          >
            Surabaya
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-46 ">
        {currentEvents.map((event, key) => (
          <EventCard {...event} key={key} />
        ))}
      </div>

      <div className="flex justify-center mt-2 mb-3">
        <button
          disabled={onFirstPage}
          onClick={goToPreviousPage}
          className={`px-6 py-2 mx-1 rounded-md text-sm font-medium ${
            onFirstPage ? "cursor-not-allowed opacity-50" : "hover:bg-gray-100"
          }`}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`px-4 py-2 mx-1 rounded-md text-sm font-medium ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={onLastPage}
          onClick={goToNextPage}
          className={`px-6 py-2 mx-1 rounded-md text-sm font-medium ${
            onLastPage ? "cursor-not-allowed opacity-50" : "hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default EventListComponent;

export function EventCard({
  image_url,
  eventName,
  id,
  price,
  location,
  eventDate,
}) {
  return (
    <Link
      className="bg-white rounded-lg overflow-hidden shadow-md my-4"
      href={"/events/" + id}
    >
      <img
        src={process.env.API_URL + image_url}
        className=" max-h-[384px] h-80 max-w-[384px] w-full"
        alt={eventName}
        objectFit="cover"
      />
      <div className="p-4 mb-2">
        <h2 className="text-xl font-bold mb-2 my-2">{eventName}</h2>
        <p className="text-gray-600 mb-2">
          {location} | {moment(eventDate).format("YYYY-MM-DD")}
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
