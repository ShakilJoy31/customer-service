export interface CardItemProps {
  children: React.ReactNode;
  className?: string;
  translateZ?: number | string;
  as?: React.ElementType;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  target?: string;
}



export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  isSale?: boolean;
  tags?: string[];
}

export interface ProductCardProps {
  product: Product;
  className?: string;
  imageHeight?: string;
  showCategory?: boolean;
  showRating?: boolean;
  showActions?: boolean;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}