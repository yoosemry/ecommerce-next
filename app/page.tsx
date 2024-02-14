import Link from "next/link";


export default function Home() {
  return (
    <main  className="flex flex-col justify-center items-center">
    <h1>hello world</h1>

    <div className="flex space-x-4 text-2xl mt-7">
    <Link href="/">home</Link>
      <Link href="/api/auth/signin">LogIng</Link>
      <Link href="/api/auth/signout">logOut</Link>
      
    </div>


    </main>
  );
}
