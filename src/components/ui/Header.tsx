function Header() {
  return (
    <header className="absolute top-0 w-full p-4 bg-gray-800 text-white flex justify-between items-center">
      <h2 className="text-2xl">Spectrum</h2>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="#home" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
