"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { categorySchema } from "../../../../../../validation/categorySchema";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { API } from "@/lib/config";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Categoty } from "@prisma/client";
import { Loader2 } from "lucide-react";

const CategoryForm = ({category} : {category? : Categoty} ) => {

    const router = useRouter()
    const quertClient = useQueryClient()
    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: category?.name
        },
    });

    const onSubmit = async (value: z.infer<typeof categorySchema>) => {

        try {

            if(category){
                await axios.patch(`${API}/admin/category/${category.id}`, value)
                toast('Updated Category');
            }else{
                await axios.post(`${API}/admin/category/`, value)
                toast.success('Created New Category');
            }


            router.push('/dashboard/admin/category');
            quertClient.invalidateQueries({ queryKey: ['category'] });
        } catch (error) {
            toast.error('unknow error please try again')
        }
    };

    return (
        <Card className="max-w-2xl mx-auto my-10">
            <CardHeader>
                <CardTitle>{category ? 'Update New Category' : 'Register New Category' }</CardTitle>
                <CardDescription>{category ? 'Update New Category' : 'Register New Category' } </CardDescription>
            </CardHeader>
            <CardContent>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Category Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <SubmitButtonWithContent loading={form.formState.isSubmitting} isUpdate={!!category}/>

                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default CategoryForm;

export const SubmitButtonWithContent = ( {loading , isUpdate} : {loading: boolean , isUpdate : boolean})=>{

   if(loading){
    return(
        <Button className="space-x-2 gap-1" variant={"outline"} size={"lg"}>
            {isUpdate ? "Updating " : "Registering "} 
            Category <Loader2 className="animate-spin h-5 w-5 text-black"/>

        </Button>
    )
   } 
   
   return <Button type="submit" variant={"outline"} size={"lg"}>
    {isUpdate ? "Update " : "Register "}
    Category
   </Button>

  
}


