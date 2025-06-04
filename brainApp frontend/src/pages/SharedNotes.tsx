import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useGetSharedNotes } from "../hooks/useContentQueries";
import { IContent } from "../store_and_types/types";
import { Navbar } from "../components/Navbar";
import { LoaderIcon } from "../icons/LoaderIcon";
import { LinkIcon } from "../icons/LinkIcon";

function SharedNotes() {
  const { hash } = useParams<{ hash: string | undefined }>();

  const { data, isError, isPending } = useGetSharedNotes(hash);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderIcon />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        <p>The shareable link has expired</p>
      </div>
    );
  }

  const handleLink = async (link: string) => {
    await navigator.clipboard.writeText(`${link}`);

    toast.success("Link copied");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="px-20">
          <div className=" flex flex-col justify-center items-center gap-5">
            <h1
              className="pt-16 text-4xl text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-400"
              style={{ fontFamily: "italiana" }}
            >
              KeepNote
            </h1>
            <h2 className="text-xl">
              {data.firstName} {data.lastName}
            </h2>
          </div>
          <div className="flex flex-wrap gap-7  mt-14 py-5  xl:justify-normal justify-center  ">
            {data.content < 1 && (
              <div className=" w-full text-center">
                <p>Notes are empty</p>
              </div>
            )}

            {data.content.map((content: IContent) => (
              <article
                className="bg-white dark:bg-zinc-800 w-72 p-5 shadow-sm dark:shadow-zinc-800  shadow-gray-300  rounded-lg flex flex-col gap-5"
                key={content._id}
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-medium">{content.title}</h2>
                  <button
                    className={`text-zinc-500 hover:text-zinc-900  hover:dark:text-zinc-100 `}
                    onClick={() => handleLink(content.link as string)}
                    title="Click to copy link"
                  >
                    {content.link && <LinkIcon />}
                  </button>
                </div>
                <p>{content.description}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default SharedNotes;
