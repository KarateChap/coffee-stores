const Banner = ({buttonText, handleOnClick}) => {
  return (
    <div className="w-full  h-[auto] flex justify-center items-start flex-col py-[200px] px-10 sm:px-20 md:px-[150px] lg:px-[200px] gap-5">
      <h1 className="text-3xl sm:text-4xl md:text-5xl flex flex-row flex-wrap font-bold gap-2">
        <span className="text-white">Coffee</span>
        <span className="text-indigo-600">Connoisseur</span>
      </h1>
      <p className="tex-white">Discover your local coffee shops!</p>
      <button onClick={handleOnClick} className="px-6 py-3 bg-indigo-600 text-white rounded-md">{buttonText}</button>
    </div>
  )
}

export default Banner
