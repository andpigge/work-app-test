"use client";

import { ViewProduct } from "@src/components/view-product";

type Props = {
  params: {
    'product-id': string;
  };
};

export default function HelpPage({ params }: Props) {
  return <ViewProduct productId={params["product-id"]} />;
}
