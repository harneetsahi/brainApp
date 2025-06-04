import { Header } from "../components/Header";
import { HomeSection } from "../components/HomeSection";
import { Sidebar } from "../components/Sidebar";

function Dashboard() {
  return (
    <>
      <Sidebar />
      <main className="px-3 sm:px-5 flex-1 ml-14 sm:ml-50 min-h-screen  max-w-600 mx-auto  ">
        <Header />
        <HomeSection />
      </main>
    </>
  );
}

export default Dashboard;
