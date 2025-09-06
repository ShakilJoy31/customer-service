

import CustomizeContact from "@/components/Home/CustomizeCOntact";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";

export async function generateMetadata() {
  return generateDynamicMetadata({
    title: "HSBC Customer Service | Contact",
    description: "Discover amazing products at unbeatable prices. Shop the latest trends in electronics, fashion, home goods and more. Free shipping on orders over $50. Secure checkout guaranteed.",
    keywords: [
      "online shopping", "ecommerce store", "buy products online",
      "electronics", "fashion", "home decor", "premium products",
      "discounts", "free shipping", "secure checkout", "best deals",
      "shopping", "online store", "quality products", "affordable prices"
    ],
  });
}

const CustomizeContactPage = () => {
  return (
    <div className="bg-[#F4F6F8] dark:bg-gray-600">
      <CustomizeContact></CustomizeContact>
    </div>
  )
}

export default CustomizeContactPage;
