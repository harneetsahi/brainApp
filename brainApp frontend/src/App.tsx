import { Button } from "./components/Button";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";

function App() {
  return (
    <>
      <Button
        variant={"secondary"}
        text={"Share Brain"}
        size={"md"}
        startIcon={<ShareIcon size={"md"} />}
      />
      <Button
        variant={"primary"}
        text={"Add Content"}
        size={"md"}
        startIcon={<PlusIcon size={"md"} />}
      />
    </>
  );
}

export default App;
