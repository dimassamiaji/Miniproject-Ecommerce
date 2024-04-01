import Image from "next/image";
import Spotify from "../assets/Spotify.webp";
import youtube from "../assets/youtube.png";
import grab from "../assets/grab.png";
import google from "../assets/google.png";
import microsoft from "../assets/expressjs.png";
import react from "../assets/react1.png";
import next from "../assets/next.png";
import python from "../assets/python.png";
import php from "../assets/php.png";

export default function FooterComponent() {
  return (
    <div className="flex flex-col md:min-h-screen">
      <div className="bg-gray-100 p-8">
        <h2 className="text-2xl font-bold text-center mb-4">
          Join these brands
        </h2>
        <p className="text-center mb-8">
          We've had the pleasure of working with industry-defining brands. 
          These are just some of them.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-8">
          <Image src={Spotify} alt="" className=" w-36" />
          <Image src={youtube} alt="" className=" w-36" />
          <Image src={grab} alt="" className=" w-36" />
          <Image src={google} alt="" className=" w-36" />
          <Image src={microsoft} alt="" className=" w-36" />
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <Image src={react} alt="" className=" w-36" />
          <Image src={next} alt="" className=" w-36" />
          <Image src={python} alt="" className=" w-36" />
          <Image src={php} alt="" className=" w-36" />
        </div>
      </div>

      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold mb-6">Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded shadow p-4">
            <img className="rounded mb-4" src="musicBlog.jpeg" alt="Blog" />
            <h3 className="font-bold mb-2">How Create Music Blog</h3>
            <p className="text-gray-600 text-justify text-sm mb-4">
            Music has always been an aspect of the human experience, so it makes sense that music blogs are plentiful on the internet. But what exactly is a music blog, and do the bloggers make any money? Learn how to start a music blog and check out some examples that may inspire you to create your own blog dedicated to your favorite music
            </p>
            <div className="text-gray-500 text-xs">4 Mei - Fadly Mamby</div>
          </div>

          <div className="bg-white rounded shadow p-4">
            <img className="rounded mb-4" src="sportBlog.webp" alt="Blog" />
            <h3 className="font-bold mb-2">Popular Sport Blog & Website</h3>
            <p className="text-gray-600 text-justify text-sm mb-4">
            For any true sports fan, nothing gets the competitive juices flowing like diving into some thought-provoking blogs and websites. If you're looking for insider analysis, epic game recaps, or just a few laughs, sports blogs and websites are a must-read for staying in the know For those of us who live and die with our favorite teams.
            </p>
            <div className="text-gray-500 text-xs">17 Jan - Dimas Sinarmas</div>
          </div>

          <div className="bg-white rounded shadow p-4">
            <img className="rounded mb-4" src="eduBlog.webp" alt="Blog" />
            <h3 className="font-bold mb-2">Education Blog For Parents</h3>
            <p className="text-gray-600 text-justify text-sm mb-4">
            IQ or intelligence quotient is the score derived from standardized tests to measure an individual’s thinking, cognitive, and reasoning abilities. But what does IQ really mean for children? Is it completely determined by one’s. The joy of being a parent is priceless! But at the same time. the task of raising kids can be daunting or rewarding depending.
            </p>
            <div className="text-gray-500 text-xs">8 Feb - Achoi Perry</div>
          </div>

        </div>
        <div className="text-center">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-full">
            Load More
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto bg-gray-800 text-white p-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Footer Sections */}
          <FooterSection title="Eventick" />
          <FooterSection title="Plan Events" />
          <FooterSection title="Stay In The Loop" />
        </div>
      </footer>
    </div>
  );
}

function FooterSection({ title }) {
  return (
    <div>
      <h3 className="font-bold mb-4">{title}</h3>
      {/* Replace with actual content */}
      <p>Footer content</p>
    </div>
  );
}
