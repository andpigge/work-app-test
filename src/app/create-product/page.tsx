"use client";

import { CreateProduct } from "@src/components/create-product";
import { useAppSelector } from "@src/redux/hooks";
import { getCookie } from "@src/shared/lib/get-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HelpPage() {
  const router = useRouter();
  const token = getCookie("access_token")
  const { authorizing } = useAppSelector((store) => store.user);

  useEffect(() => {
    if (!token) {
      router.push('/')
    }
  }, [token])

  return authorizing ? <CreateProduct /> : undefined;
}
