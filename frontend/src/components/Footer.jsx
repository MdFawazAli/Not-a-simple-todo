export default function Footer() {
  return (
    <footer className="w-full bg-linear-to-r from-blue-100 via-purple-100 to-white border-t border-blue-200/40 py-6 mt-8 text-center shadow-inner">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-2">
        <div className="text-gray-700 text-sm">
          <span className="font-semibold">Not-a-simple-todo</span> &copy; {new Date().getFullYear()}<br />
          <span>Modern, vibrant productivity app for your daily tasks and groceries.</span>
        </div>
        <div className="flex gap-4 mt-2">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-purple-500 font-bold underline">GitHub</a>
          <a href="/about" className="text-purple-500 hover:text-blue-500 font-bold underline">About</a>
          <a href="mailto:support@notasimpletodo.com" className="text-blue-500 hover:text-purple-500 font-bold underline">Contact</a>
        </div>
      </div>
    </footer>
  );
}
