import { Header } from "../components/Header";
import { HomeSection } from "../components/HomeSection";
import { Sidebar } from "../components/Sidebar";

function Dashboard() {
  return (
    <>
      <div className="flex h-screen">
        <div className="">
          <Sidebar />
        </div>
        <main className="ml-50 px-5 flex-1 bg-white dark:bg-zinc-900  text-gray-800 dark:text-gray-300">
          <Header />
          <HomeSection />
        </main>
      </div>
    </>
  );
}

export default Dashboard;
