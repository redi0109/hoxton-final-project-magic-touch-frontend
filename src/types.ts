export type Data = {
  user: User;
  token: string;
};

export type User = {
  id: number;
  name: string;
  email: String;
  password: String;
  balance: number;
  cart: CartItem[];
  boughtProducts: BoughtProduct[];
};

export type Product = {
  id: number;
  productName: String;
  description: String;
  price: number;
  image: String;
  inStock: number;
  categories: Category[];
  brandId: number;
  brand: Brand;
  cartItem: CartItem[];
  boughtProduct: BoughtProduct[];
};

export type Category = {
  id: number;
  name: String;
  products: Product[];
};

export type CartItem = {
  id: number;
  user: User;
  product: Product;
  userId: number;
  productId: number;
  quantity: number;
};

export type BoughtProduct = {
  id: number;
  user: User;
  product: Product;
  userId: number;
  productId: number;
};

export type Brand = {
  id: number;
  name: String;
  product: Product[];
  productId: number;
};
