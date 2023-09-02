import Link from 'next/link'
import React from 'react'

const Page = () => {
    return (
        <div className="flex justify-center items-center min-h-screen card">
            <Link href={"/quiz"} className=" text-lg md:text-2xl border rounded p-5 cursor-pointer ">
                Click Here To Start Your Quiz!!
            </Link>
        </div>
    )
}

export default Page
