import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <>
      <div className="flex">
        <div className="">
          <Sidebar />
        </div>
        <main className="ml-50 flex-1">
          <Header />
        </main>
      </div>
    </>
  );
}

export default App;
