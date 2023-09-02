import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="card flex justify-center items-center min-h-screen flex-col text-xl md:text-4xl text-[#ffffff]">
        <p>This is a Home page</p>
        <p>To start the Game: <Link className="text-blue-500 underline" href={"/filter"}>Click Here</Link>.</p>
      </div>
    </>
  )
}
