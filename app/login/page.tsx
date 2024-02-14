import React from "react";
import { FaGoogle } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title:"login user",
  description : 'login form'

}

const page : NextPage = () => {
  return (
    <div  className="w-[350px] m-auto flex justify-center items-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Login With Google</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
        <Button variant="outline" className="w-full space-x-4 text-center"><FaGoogle  className="w-5 h-5"/>
        <span className="capitalize cursor-pointer">Continue with google</span>
        </Button>


        </CardContent>
     
      </Card>
    </div>
  );
};

export default page;
