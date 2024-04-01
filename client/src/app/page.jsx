/** @format */

import NavbarComponent from "@/components/navbar";
import EventListComponent from "@/components/eventList";
import VideoSliderComponent from "@/components/slider";
import FooterComponent from "@/components/footer";

export const metadata = {
  title: "Gotix - Home",
  description: "tempat jualan ticket",
};

export default function Home() {
  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col justify-center max-w-screen-2xl w-full items-center m-auto">
        <VideoSliderComponent/>
        <EventListComponent />
        <FooterComponent/>
      </div>
    </>
  );
}
