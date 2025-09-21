import dayjs from "dayjs";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const FacebookIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {" "}
    <path
      d="M14.9987 1.66699H12.4987C11.3936 1.66699 10.3338 2.10598 9.55242 2.88738C8.77102 3.66878 8.33203 4.72859 8.33203 5.83366V8.33366H5.83203V11.667H8.33203V18.3337H11.6654V11.667H14.1654L14.9987 8.33366H11.6654V5.83366C11.6654 5.61265 11.7532 5.40068 11.9094 5.2444C12.0657 5.08812 12.2777 5.00033 12.4987 5.00033H14.9987V1.66699Z"
      stroke="#90A1B9"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />{" "}
  </svg>
);
const InstagramIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {" "}
    <path
      d="M14.5846 5.41699H14.593M5.83464 1.66699H14.168C16.4692 1.66699 18.3346 3.53247 18.3346 5.83366V14.167C18.3346 16.4682 16.4692 18.3337 14.168 18.3337H5.83464C3.53345 18.3337 1.66797 16.4682 1.66797 14.167V5.83366C1.66797 3.53247 3.53345 1.66699 5.83464 1.66699ZM13.3346 9.47533C13.4375 10.1689 13.319 10.8772 12.9961 11.4995C12.6732 12.1218 12.1623 12.6265 11.536 12.9417C10.9097 13.2569 10.2 13.3667 9.50779 13.2553C8.81557 13.1439 8.1761 12.8171 7.68033 12.3213C7.18457 11.8255 6.85775 11.1861 6.74636 10.4938C6.63497 9.80162 6.74469 9.0919 7.05991 8.46564C7.37512 7.83937 7.87979 7.32844 8.50212 7.00553C9.12445 6.68261 9.83276 6.56415 10.5263 6.66699C11.2337 6.7719 11.8887 7.10154 12.3944 7.60725C12.9001 8.11295 13.2297 8.76789 13.3346 9.47533Z"
      stroke="#90A1B9"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />{" "}
  </svg>
);
const TwitterIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {" "}
    <path
      d="M18.3346 3.33368C18.3346 3.33368 17.7513 5.08368 16.668 6.16701C18.0013 14.5003 8.83464 20.5837 1.66797 15.8337C3.5013 15.917 5.33464 15.3337 6.66797 14.167C2.5013 12.917 0.417969 8.00034 2.5013 4.16701C4.33464 6.33368 7.16797 7.58368 10.0013 7.50034C9.2513 4.00034 13.3346 2.00034 15.8346 4.33368C16.7513 4.33368 18.3346 3.33368 18.3346 3.33368Z"
      stroke="#90A1B9"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />{" "}
  </svg>
);
const LinkedinIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {" "}
    <path
      d="M13.3346 6.66699C14.6607 6.66699 15.9325 7.19378 16.8702 8.13146C17.8079 9.06914 18.3346 10.3409 18.3346 11.667V17.5003H15.0013V11.667C15.0013 11.225 14.8257 10.801 14.5131 10.4885C14.2006 10.1759 13.7767 10.0003 13.3346 10.0003C12.8926 10.0003 12.4687 10.1759 12.1561 10.4885C11.8436 10.801 11.668 11.225 11.668 11.667V17.5003H8.33464V11.667C8.33464 10.3409 8.86142 9.06914 9.7991 8.13146C10.7368 7.19378 12.0086 6.66699 13.3346 6.66699Z"
      stroke="#90A1B9"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />{" "}
    <path
      d="M5.0013 7.50033H1.66797V17.5003H5.0013V7.50033Z"
      stroke="#90A1B9"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />{" "}
    <path
      d="M3.33464 5.00033C4.25511 5.00033 5.0013 4.25413 5.0013 3.33366C5.0013 2.41318 4.25511 1.66699 3.33464 1.66699C2.41416 1.66699 1.66797 2.41318 1.66797 3.33366C1.66797 4.25413 2.41416 5.00033 3.33464 5.00033Z"
      stroke="#90A1B9"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />{" "}
  </svg>
);

const socials = [
  {
    icon: FacebookIcon,
    link: "#",
  },
  {
    icon: InstagramIcon,
    link: "#",
  },
  {
    icon: TwitterIcon,
    link: "#",
  },
  {
    icon: LinkedinIcon,
    link: "#",
  },
];

const categories = [
  {
    name: "Earphones",
    link: "#",
  },
  {
    name: "Headphones",
    link: "#",
  },
  {
    name: "Smartphones",
    link: "#",
  },
  {
    name: "Laptops",
    link: "#",
  },
];

const websites = [
  {
    name: "Home",
    link: "#",
  },
  {
    name: "Privacy Policy",
    link: "#",
  },
  {
    name: "Become Plus Member",
    link: "#",
  },
  {
    name: "Create Your Store",
    link: "#",
  },
];

const contact = [
  {
    name: "+1-212-456-7890",
    link: "#",
    icon: Phone,
  },
  {
    name: "contact@example.com",
    link: "#",
    icon: Mail,
  },
  {
    name: "794 Francisco, 94102",
    link: "#",
    icon: MapPin,
  },
];

const Footer: React.FC = () => {
  return (
    <div className="px-6 max-w-7xl m-auto mt-24 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="col-span-1 space-y-6">
          <div>
            <Link href="/" className="text-4xl font-semibold text-slate-700">
              <span className="text-green-600">go</span>cart
              <span className="text-green-600 text-5xl leading-0">.</span>
            </Link>
          </div>
          <p className="text-sm max-w-md text-slate-500">
            Welcome to gocart, your ultimate destination for the latest and
            smartest gadgets. From smartphones and smartwatches to essential
            accessories, we bring you the best in innovation — all in one place.
          </p>
          <div className="flex gap-3">
            {socials.map((social, index) => (
              <Link
                key={index}
                href={social.link}
                className="rounded-full size-10 bg-slate-100 flex items-center justify-center hover:scale-105 transition hover:border hover:border-slate-300"
              >
                <social.icon />
              </Link>
            ))}
          </div>
        </div>
        <div className="col-span-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 ">
            <div className="col-span-1">
              <h3 className="text-sm">PRODUCTS</h3>
              <div className="flex flex-col gap-2 mt-4">
                {categories.map((category) => (
                  <Link
                    href={category.link}
                    className="text-slate-500 text-sm hover:underline"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="col-span-1">
              <h3 className="text-sm">WEBSITE?</h3>
              <div className="flex flex-col gap-2 mt-4">
                {websites.map((website) => (
                  <Link
                    href={website.link}
                    className="text-slate-500 text-sm hover:underline"
                  >
                    {website.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="col-span-1">
              <h3 className="text-sm">CONTACT</h3>
              <div className="flex flex-col gap-2 mt-4">
                {contact.map((contact) => (
                  <Link
                    href={contact.link}
                    className="text-slate-500 text-sm gap-2 flex items-center hover:underline"
                  >
                    <contact.icon className="size-4 text-slate-400 " />{" "}
                    {contact.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm text-slate-500 py-5 border-t">
        Copyright {dayjs().format("YYYY")} © gocart All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
