/** @format */

import NavbarComponent from "@/components/navbar";
import SliderComponent from "@/components/slider";
import EventListComponent from "@/components/eventList";

export const metadata = {
  title: "Gotix - Home",
  description: "tempat jualan ticket",
};

export default function Home() {
  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col justify-center max-w-screen-2xl w-full items-center m-auto">
        <SliderComponent />
        <EventListComponent />
      </div>
    </>
  );
}
