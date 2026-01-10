import { FaGithub } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="w-full bg-linear-to-r from-blue-100 via-purple-100 to-white border-t border-blue-200/40 py-6 mt-8 text-center shadow-inner">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-2">
        <div className="text-gray-700 text-sm">
          <span className="font-semibold">Not-a-simple-todo</span> &copy; {new Date().getFullYear()}<br />
          <span>Modern, vibrant productivity app for your daily tasks and groceries.</span>
        </div>
        <div className="flex gap-4 mt-2">
          <a href="https://github.com/MdFawazAli" target="_blank" rel="noopener noreferrer" className="text-blue-500 text-3xl hover:text-purple-500 font-bold underline"><FaGithub/> </a>
          <a href="https://www.linkedin.com/in/mohammedfawazali" className="text-purple-500 hover:text-blue-500 text-3xl font-bold underline"><IoLogoLinkedin /></a>
          <a href="https://x.com/FAZZMEE" className="text-blue-500 text-3xl hover:text-purple-500 font-bold underline"><FaSquareXTwitter /></a>
          <a href="https://mail.google.com/mail/?view=cm&to=fawazzali786@gmail.com&su=I%20want%20to%20connect%20with%20you%20Fawaz&body=Hi%20Fawaz%2C%20I%20would%20like%20to%20connect%20with%20you!" className="text-purple-600 text-3xl hover:text-blue-600 font-bold underline" title="Connect with Fawaz"><MdEmail /></a>
        </div>
      </div>
    </footer>
  );
}
