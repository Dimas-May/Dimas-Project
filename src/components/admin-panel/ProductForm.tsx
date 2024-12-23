"use client";
import { setLoading } from "@/redux/features/loadingSlice";
import { useAppDispatch } from "@/redux/hooks";
import { makeToast } from "@/utils/helper";
import axios from "axios";
import Image from "next/image";
import React, { FormEvent, useState } from "react";

interface IPayload {
  imgSrc: null | string;
  fileKey: null | string;
  name: string;
  category: string;
  price: string;
}

const ProductForm = () => {
  const [payLoad, setPayLoad] = useState<IPayload>({
    imgSrc: null,
    fileKey: null,
    name: "",
    category: "",
    price: "",
  });

  const Dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    Dispatch(setLoading(true));

    axios
      .post("/api/add_product", payLoad)
      .then((res) => {
        makeToast("Product added Succsessfully");
        setPayLoad({
          imgSrc: null,
          fileKey: null,
          name: "",
          category: "",
          price: "",
        });
      })
      .catch((err) => console.log(err))
      .finally(() => Dispatch(setLoading(false)));
  };

  return (
    <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
      <Image
        className="max-h-[300px] w-auto object-contain rounded-md"
        src={payLoad.imgSrc ? payLoad.imgSrc : "/placeholder.jpg"}
        width={800}
        height={500}
        alt="product_image"
      />
    </form>
  );
};

export default ProductForm;
