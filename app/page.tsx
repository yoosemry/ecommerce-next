
import Session from "@/_components/Session";
import Link from "next/link";


export default function Home() {
  return (
    <main  className="flex flex-col justify-center items-center">
   
    <div className="flex space-x-4 text-2xl mt-7">
    <Link href="/">home</Link>
    <Session/>
    
      <Link href="/api/auth/signin">LogIng</Link>
      <Link href="/api/auth/signout">logOut</Link> 
      <Link href="/dashboard/admin">admin</Link>
      <Link href="/dashboard/user">user</Link>
      
    </div>


    </main>
  );
}
