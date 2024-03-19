"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { object, promise, z } from "zod";
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
import { CameraIcon, Loader2, XIcon } from "lucide-react";
import ProductIdSelect from "./ProductIdSelect";
import { Textarea } from "@/components/ui/textarea";
import { useDropzone } from "react-dropzone";

const ProductForm = ({ product }: { product?: Product }) => {
  const router = useRouter();
  const quertClient = useQueryClient();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name,
      price: product?.price,
      categoryId: product?.categoryId,
      gallery: product?.gallery,
      stockQuantity: product?.stockQuantity,
      description: product?.description,
    },
  });

  const [files, setFiles] = useState<dropwithPrivew[]>([]);

  interface dropwithPrivew extends File {
    preview: string;
  }

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*" as any,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
  });

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const onSubmit = async (value: z.infer<typeof productSchema>) => {
    const formData = new FormData();

    Object.keys(value).forEach((key) => {
      if (key !== "gallery") {
        const values = value[key as keyof typeof value];

        if (values !== undefined) {
          formData.append(key, values.toString());
        }
      }
    });

    for (const file of files) {
      const base64 = await toBase64(file);
      formData.append("newImages", base64);
    }

    try {
      if (product) {
        await axios.patch(`${API}/admin/product/${product.id}`, value);
        toast("Updated Product");
      } else {
        await axios.post(`${API}/admin/product/`, formData);
        toast.success("Created New Product");
      }
      router.push("/dashboard/admin/product");
      quertClient.invalidateQueries({ queryKey: ["product"] });
    } catch (error) {
      toast.error("unknow error please try again");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto my-10">
      <CardHeader>
        <CardTitle>
          {product ? "Update New Product" : "Register New Product"}
        </CardTitle>
        <CardDescription>
          {product ? "Update New Product" : "Register New Product"}{" "}
        </CardDescription>
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
              render={({ field }) => <ProductIdSelect control={form.control} />}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Product Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                      placeholder="Enter Product Price"
                    />
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
                    <Input
                      placeholder="Enter stockQuantity"
                      type="number"
                      {...field}
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                    />
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
                    <Textarea
                      placeholder="Enter Product discription"
                      {...field}
                    />
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
                    <div {...getRootProps()} className="dropzone">
                      <input {...getInputProps} />
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <CameraIcon className="h-10 w-10 text-gray-900/25" />
                        </div>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-wrap mt-4">
              {files.map((file, index) => (
                <div className="relative m-2">
                  <img
                    key={index}
                    src={file.preview}
                    alt={file.name}
                    className="w-28 h-28 object-cover rounded-md space-x-1"
                  />

                  <button
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    onClick={() => removeFile(index)}
                  >
                    <XIcon className="text-white w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <SubmitButtonWithContent
              loading={form.formState.isSubmitting}
              isUpdate={!!product}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;

export const SubmitButtonWithContent = ({
  loading,
  isUpdate,
}: {
  loading: boolean;
  isUpdate: boolean;
}) => {
  if (loading) {
    return (
      <Button className="space-x-2 gap-1" variant={"outline"} size={"lg"}>
        {isUpdate ? "Updating " : "Registering "}
        Product <Loader2 className="animate-spin h-5 w-5 text-black" />
      </Button>
    );
  }

  return (
    <Button type="submit" variant={"outline"} size={"lg"}>
      {isUpdate ? "Update " : "Register "}
      Product
    </Button>
  );
};
