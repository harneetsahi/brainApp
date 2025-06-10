import { Link } from "react-router-dom";
import { Button } from "../components/Button";

import { NotesIcon } from "../icons/NotesIcon";
import { Navbar } from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen">
        <div className=" flex flex-col gap-10 justify-center items-center h-screen ">
          <div className="relative">
            <h1
              className="mb-3 lg:text-[94px] sm:text-[72px] text-5xl transition-all text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-400 "
              style={{ fontFamily: "Italiana" }}
            >
              KeepNote
            </h1>
            <h2
              className=" sm:text-[26px] text-lg text-center "
              style={{ fontFamily: "italiana" }}
            >
              one place for your everyday notes
            </h2>
            <div className="absolute lg:-right-30 sm:-right-16 -right-2  lg:-top-6 sm:-top-11 -top-11 transition-all">
              <NotesIcon className="sm:size-26 size-14" />
            </div>
          </div>
          <div className="flex sm:flex-row flex-col gap-5  transition-all w-65 sm:w-max">
            <Link to="/signup">
              <Button
                variant="tertiaryDark"
                text="Get started"
                size="md"
                className="hover:scale-103 sm:w-36 w-full "
              />
            </Link>
            <Link to="/login">
              <Button
                variant="primary"
                text="Log in"
                size="md"
                className="sm:w-36 w-full  "
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
