"use client";

import { CreateProduct } from "@src/components/create-product";
import { getCookie } from "@src/shared/lib/get-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HelpPage() {
  const router = useRouter();
  const authorizing = getCookie("access_token")

  useEffect(() => {
    if (!authorizing) {
      router.push('/')
    }
  }, [authorizing])

  return (authorizing && <CreateProduct />);
}
