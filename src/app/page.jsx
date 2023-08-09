import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Link href={"/quiz"} className="text-2xl border rounded p-5 cursor-pointer">
        Click Here To Start Your Quiz!!
      </Link>
    </div>
  )
}
