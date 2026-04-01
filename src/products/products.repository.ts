// import { Injectable } from "@nestjs/common";
// import { ProductDto } from "./dtos/product.dto";

// export interface Products {
//     id: number,
//     name: string,
//     description: string,
//     price: number,
//     stock: boolean,
//     imgUrl: string,
// }

// @Injectable()
// export class ProductsRepository {
//     products : Products[] = [
//         {
//             id: 1,
//             name: "Auriculares Inalámbricos",
//             description: "Auriculares Bluetooth con cancelación de ruido y estuche de carga.",
//             price: 59.99,
//             stock: true,
//             imgUrl: "https://example.com/img/auriculares.jpg"
//         },
//         {
//             id: 2,
//             name: "Smartwatch Deportivo",
//             description: "Reloj inteligente resistente al agua con monitor de ritmo cardíaco.",
//             price: 89.90,
//             stock: true,
//             imgUrl: "https://example.com/img/smartwatch.jpg"
//         },
//         {
//             id: 3,
//             name: "Teclado Mecánico RGB",
//             description: "Teclado mecánico con retroiluminación RGB y switches rojos.",
//             price: 74.50,
//             stock: true,
//             imgUrl: "https://example.com/img/teclado.jpg"
//         },
//         {
//             id: 4,
//             name: "Mochila Antirrobo",
//             description: "Mochila con cremalleras ocultas y puerto USB integrado.",
//             price: 39.99,
//             stock: true,
//             imgUrl: "https://example.com/img/mochila.jpg"
//         },
//         {
//             id: 5,
//             name: "Silla Gamer",
//             description: "Silla ergonómica con soporte lumbar y reposabrazos ajustables.",
//             price: 159.00,
//             stock: true,
//             imgUrl: "https://example.com/img/silla-gamer.jpg"
//         },
//         {
//             id: 6,
//             name: "Monitor 27'' 144Hz",
//             description: "Monitor IPS de 27 pulgadas con tasa de refresco de 144Hz.",
//             price: 249.99,
//             stock: true,
//             imgUrl: "https://example.com/img/monitor.jpg"
//         },
//         {
//             id: 7,
//             name: "Cámara Web Full HD",
//             description: "Cámara web 1080p ideal para videollamadas y streaming.",
//             price: 29.99,
//             stock: true,
//             imgUrl: "https://example.com/img/webcam.jpg"
//         },
//         {
//             id: 8,
//             name: "Ratón Gamer",
//             description: "Ratón gaming con 7 botones programables y sensor óptico de alta precisión.",
//             price: 24.90,
//             stock: true,
//             imgUrl: "https://example.com/img/raton.jpg"
//         },
//         {
//             id: 9,
//             name: "Disco SSD 1TB",
//             description: "Unidad de estado sólido de 1TB con velocidad de lectura de 3500 MB/s.",
//             price: 119.00,
//             stock: true,
//             imgUrl: "https://example.com/img/ssd.jpg"
//         },
//         {
//             id: 10,
//             name: "Altavoz Bluetooth",
//             description: "Altavoz portátil resistente al agua con sonido 360°.",
//             price: 45.00,
//             stock: true,
//             imgUrl: "https://example.com/img/altavoz.jpg"
//         }
//     ];

//     getProducts(page: number, limit: number) {
//         const start = (page -1) * limit;
//         const end = start + limit;

//         return this.products.slice(start, end);
//     }

//     getProductById(id: number) {
//         const product = this.products.find(item => item.id === id);
//         if (!product) return null;
//         return product;
//     }

//     createProduct(product: ProductDto) {
//         const prod = this.products.find(item => item.name === product.name)
//         if (prod) return null;
//         if (this.products.length === 0) {
//             const newProduct = {id: 1, ...product};
//             this.products = [...this.products, newProduct];
//             return newProduct;
//         }
//         const maxId = Math.max(...this.products.map(u => u.id));
//         const id = maxId + 1;
//         const newProduct = {id, ...product}
//         this.products = [...this.products, newProduct];
//         return newProduct;
//     }

//     updateProduct(id: number, data: Partial<Products>) {
//         const index = this.products.findIndex(item => item.id === id);
//         const update = {
//             ...this.products[index],
//             ...data,
//             id,
//         }
//         this.products[index] = update;
//         return update;
//     }

//     deleteProduct(id: number) {
//         const index = this.products.findIndex(item => item.id === id);
//         this.products.splice(index, 1);
//         return id;
//     }
// }
