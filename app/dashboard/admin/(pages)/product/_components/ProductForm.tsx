"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { productSchema } from "../../../../../../validation/productSchema";

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
import { Product } from "@prisma/client";
import { Loader2 } from "lucide-react";
import ProductIdSelect from "./ProductIdSelect";
import { Textarea } from "@/components/ui/textarea";

const ProductForm = ({ product }: { product?: Product }) => {

    const router = useRouter()
    const quertClient = useQueryClient()
    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: product?.name,
            price: product?.price,
            categoryId: product?.categoryId,
            gallery: product?.gallery,
            stockQuantity: product?.stockQuantity,
            description: product?.description
        },
    });

    const onSubmit = async (value: z.infer<typeof productSchema>) => {

        try {

            // if(product){
            //     await axios.patch(`${API}/admin/product/${product.id}`, value)
            //     toast('Updated Product');
            // }else{
            //     await axios.post(`${API}/admin/product/`, value)
            //     toast.success('Created New Product');
            // }


            // router.push('/dashboard/admin/product');
            // quertClient.invalidateQueries({ queryKey: ['product'] });
        } catch (error) {
            toast.error('unknow error please try again')
        }
    };

    return (
        <Card className="max-w-2xl mx-auto my-10">
            <CardHeader>
                <CardTitle>{product ? 'Update New Product' : 'Register New Product'}</CardTitle>
                <CardDescription>{product ? 'Update New Product' : 'Register New Product'} </CardDescription>
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
                                        <Input placeholder="Enter Product Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <ProductIdSelect control={form.control} />
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter Product Price</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Product Price" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="stockQuantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter Quantity</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter stockQuantity" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Discription</FormLabel>
                                    <FormControl>
                                    
                                        <Textarea placeholder="Enter Product discription" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


<FormField
                            control={form.control}
                            name="gallery"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Gallery</FormLabel>
                                    <FormControl>
                                    
                                    <div>

                                        
                                    </div>
                                        
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        <SubmitButtonWithContent loading={form.formState.isSubmitting} isUpdate={!!product} />

                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default ProductForm;

export const SubmitButtonWithContent = ({ loading, isUpdate }: { loading: boolean, isUpdate: boolean }) => {

    if (loading) {
        return (
            <Button className="space-x-2 gap-1" variant={"outline"} size={"lg"}>
                {isUpdate ? "Updating " : "Registering "}
                Product <Loader2 className="animate-spin h-5 w-5 text-black" />

            </Button>
        )
    }

    return <Button type="submit" variant={"outline"} size={"lg"}>
        {isUpdate ? "Update " : "Register "}
        Product
    </Button>


}


