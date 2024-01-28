import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Login With Google</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
        <Button variant="outline">Button</Button>


        </CardContent>
     
      </Card>
    </div>
  );
};

export default page;
