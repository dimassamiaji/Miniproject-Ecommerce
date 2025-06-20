/** @format */

import NavbarComponent from "@/components/navbar";
import { axiosInstanceSSR } from "@/axios/axios";
import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Gotix - Event Detail",
  description: "tempat jualan tiket",
};

async function Page({ params }) {
  const { eventId } = params;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const event = (await axiosInstanceSSR().get("/events/" + eventId)).data
    .result;
  console.log(event);
  return (
    <>
      <NavbarComponent />

      <div className="flex flex-col justify-center max-w-screen-2xl w-full items-center m-auto pt-[60px]">
        <div className="grid max-w-screen-2xl md:grid-cols-2 p-7 gap-3 w-full sm:grid-cols-1">
          <div className="m-auto">
            <img
              className="max-w-full max-h-[523px] sm:max-w-[300px] sm:max-h-[300px]"
              src={process.env.API_URL + event.image_url}
              alt=""
            />
          </div>
          <div className="pt-10 flex flex-col gap-5 w-full md:w-9/12">
            <div className="font-bold text-3xl">{event.eventName}</div>
            <div className="my-2">
              <div>start from</div>
              <div className="font-bold text-3xl">
                IDR {Number(event?.price).toLocaleString("id-ID")}
              </div>
              <div className="my-4"></div>
              <div className="">Location Concert in {event.location}</div>
              <div className="">{formatDate(event.eventDate)}</div>
            </div>

            <form
              action=""
              className="flex flex-col md:flex-row gap-3"
              id="form"
            >
              <input
                className="h-[49px] border max-w-32 p-5 rounded-lg text-center"
                type="number"
                min={1}
                placeholder="Quantity"
                required
                id="qty"
              ></input>

              <Link
                href={"/transaction/" + eventId}
                className="h-[49px] border w-full md:w-[130px] p-3 rounded-lg text-white bg-black hover:bg-white border-black hover:text-black text-center"
              >
                Buy
              </Link>
            </form>
            <div className="font-semibold">
              Please Make Sure Your Ticket Before Buy
            </div>
            <hr />
            <div className="font-semibold text-center">About This Event</div>

            <div className="text-justify text-sm">
              {event.description ||
                "We thoroughly check every purchase you make and applies our company's guarantee to the product's legitimacy. The guarantee is valid for 2 days after receiving the product from the delivery service. Should you have any concern about the product you purchase, kindly reach out to our Customer Service and Specialist on Monday - Saturday 10.00 - 21.00 (GMT+7 / WIB).\n"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Page;
