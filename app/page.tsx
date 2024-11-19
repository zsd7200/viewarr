export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-evenly	p-24">
      <div className="flex flex-col gap-[5px] items-center justify-center">
        <h1 className="text-6xl">Viewarr</h1>
        <h2 className="text-lg text-slate-500">No useful functionality whatsoever!</h2>
      </div>


      <div className="flex flex-col gap-[10px] items-center justify-center">
        <ul className="flex gap-[10px] text-center">
          <li><a href="/available/movie" className="bg-violet-600 hover:bg-violet-800 px-[7px] py-[2px] rounded-md transition">All Available Movies</a></li>
          <li><a href="/requested/movie" className="bg-violet-600 hover:bg-violet-800 px-[7px] py-[2px] rounded-md transition">All Requested Movies</a></li>
          <li><a href="/search/movie" className="bg-violet-600 hover:bg-violet-800 px-[7px] py-[2px] rounded-md transition">Search Available Movies</a></li>
          <li><a href="/info/movie" className="bg-violet-600 hover:bg-violet-800 px-[7px] py-[2px] rounded-md transition">Random Available Movie</a></li>
        </ul>
        <ul className="flex gap-[10px] text-center">
          <li><a href="/available/tv" className="bg-violet-600 hover:bg-violet-800 px-[7px] py-[2px] rounded-md transition">All Available Shows</a></li>
          <li><a href="/requested/tv" className="bg-violet-600 hover:bg-violet-800 px-[7px] py-[2px] rounded-md transition">All Requested Shows</a></li>
          <li><a href="/search/tv" className="bg-violet-600 hover:bg-violet-800 px-[7px] py-[2px] rounded-md transition">Search Available Shows</a></li>
          <li><a href="/info/tv" className="bg-violet-600 hover:bg-violet-800 px-[7px] py-[2px] rounded-md transition">Random Available Show</a></li>
        </ul>
      </div>
    </div>
  );
}
