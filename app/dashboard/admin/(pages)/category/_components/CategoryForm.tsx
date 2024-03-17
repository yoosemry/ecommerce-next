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


const CategoryForm = () => {

    const router = useRouter()
    const quertClient = useQueryClient()
    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (value: z.infer<typeof categorySchema>) => {

        try {

            await axios.post(`${API}/admin/category/`, value)
            toast('Created New Category');
            router.push('/dashboard/admin/category');
            quertClient.invalidateQueries({ queryKey: ['category'] });
        } catch (error) {
            toast('unknow error please try again')
        }
    };

    return (
        <Card className="max-w-2xl mx-auto my-10">
            <CardHeader>
                <CardTitle>Register New Category</CardTitle>
                <CardDescription>Register New Category</CardDescription>
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


                        <Button type="submit" variant={"outline"}  size={"lg"}>{form.formState.isSubmitting ? 'Registered ...' : "Register"}</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default CategoryForm;

export const ButtonSide = ( {loading} : {loading :boolean}, {category} : {category :boolean})=>{

    
    return(
        <>
        <h1>h</h1>
        </>

    )
}


