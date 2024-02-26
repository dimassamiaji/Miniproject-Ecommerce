import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-darkBlue text-white pt-10 pb-5">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <h6 className="font-bold mb-4">Tentang Loket</h6>
          <ul>
            <li className="mb-2">
              <Link href="/masuk">Masuk</Link>
            </li>
            {/* ... other list items */}
          </ul>
        </div>
        {/* Column 2 */}
        <div>
          <h6 className="font-bold mb-4">Rayakan Eventmu</h6>
          <ul>{/* ... list items */}</ul>
        </div>
        {/* Column 3 */}
        <div>
          <h6 className="font-bold mb-4">Lokasi Event</h6>
          <ul>{/* ... list items */}</ul>
        </div>
        {/* Column 4 */}
        <div>
          <h6 className="font-bold mb-4">Inspirasi Event</h6>
          <ul>{/* ... list items */}</ul>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center mt-8">
        {/* Use your social media icons here */}
        <Link href="#" className="mx-2">
          Instagram Icon
        </Link>
        <Link href="#" className="mx-2">
          TikTok Icon
        </Link>
        <Link href="#" className="mx-2">
          LinkedIn Icon
        </Link>
        {/* ... other icons */}
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 mt-8">
        <p className="text-sm">
          <Link href="/tentang-kami">Tentang Kami</Link> ·
          <Link href="/blog">Blog</Link> ·<Link href="/karir">Karir</Link> ·
          {/* ... other links */}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
