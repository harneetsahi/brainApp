const labelStyle = "flex flex-col  text-gray-300 mb-1 capitalize";
const inputStyle =
  " w-full bg-gray-200 px-3 py-2 text-gray-800 rounded-lg mb-3 font-light ";

export const InputDiv = ({ text }: { text: string }) => {
  return (
    <>
      <div>
        <label className={labelStyle} htmlFor={text}>
          {text}
        </label>
        <input className={inputStyle} type="text" id={text} />
      </div>
    </>
  );
};
