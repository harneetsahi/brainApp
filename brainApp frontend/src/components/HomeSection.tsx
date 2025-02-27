import { Card } from "./Card";

export const HomeSection = () => {
  return (
    <>
      <div className=" flex flex-wrap gap-7">
        <Card
          title={"lofi girl"}
          type={"youtube"}
          link={"https://www.youtube.com/watch?v=jfKfPfyJRdk"}
        />
        <Card
          title={"Music"}
          type={"youtube"}
          link={"https://www.youtube.com/watch?v=Vd7ssAtckko"}
        />
        <Card
          title={"Tweet"}
          type={"twitter"}
          link={"https://x.com/Adele/status/1522416605954670593"}
        />
      </div>
    </>
  );
};
