const products = [
    {
        id: 1,
        name: "Logitech G703 Wireless HERO 2.4GHz RGB",
        brand: "Logitech",
        price: "90.000",
        oldPrice: "95.000",
        discount: "5.000",
        image: "/images/home/Productos/Imagen-mouse.jpg",
        images: [],
        category: "Mouse",
        specs: {
            dpi: "16000",
            weight: "107 gr",
            connection: "Wireless"
        }
    },
    {
        id: 2,
        name: "Microfono SteelSeries RGB ANC USB-C",
        brand: "SteelSeries",
        price: "295.950",
        oldPrice: "311.525",
        discount: "15.575",
        image: "/images/home/Productos/Imagen-microfono.jpg",
        images: [],
        category: "Microfono",
        specs: {
            polarPattern: "Cardioide",
            type: "Condensador",
            connection: "USB"
        }
    },
    {
        id: 3,
        name: "Teclado Redragon Mitra K551 Mechanical RGB",
        brand: "Redragon",
        price: "60.000",
        oldPrice: "63.150",
        discount: "3.150",
        image: "/images/home/Productos/Imagen-teclado.jpg",
        images: [],
        category: "Teclado",
        specs: {
            switch: "Red",
            layout: "Completo",
            connection: "USB"
        }
    },
    {
        id: 4,
        name: "Auriculares Redragon Lamia H320 RGB 7.1 Black",
        brand: "Redragon",
        price: "68.000",
        oldPrice: "71.150",
        discount: "3.150",
        image: "/images/home/Productos/Imagen-auriculares.jpg",
        images: [],
        category: "Auriculares",
        specs: {
            microphone: "Si",
            sound: "Surround 7.1",
            connection: "Wired"
        }
    },
    {
        id: 5,
        name: "Mouse Pad Corsair MM350 PRO Extendend Premium XL 930x400mm",
        brand: "Redragon",
        price: "56.600",
        oldPrice: "59.580",
        discount: "3.020",
        image: "/images/home/Productos/Imagen-mouse-pad.jpg",
        images: [],
        category: "Mouse pad",
        specs: {
            size: "XL",
            material: "Tela",
            surface: "Rapido"
        }
    },
    {
        id: 6,
        name: "Mouse Redragon Griffin RGB Black",
        brand: "Redragon",
        price: "20.100",
        oldPrice: "21.150",
        discount: "1.050",
        image: "/images/home/Productos/Imagen-mouse2.jpg",
        images: [],
        category: "Mouse",
        specs: {
            dpi: "7200",
            weight: "151 gr",
            connection: "Wired-USB"
        }
    }
];

const productController = {

    list: (req, res) => {
        res.render("products/products");
    },

    detail: (req, res) => {
        const id = req.params.id;

        const product = products.find(p => p.id == id);

        res.render("products/productDetail", { product });
    },

    cart: (req, res) => {
        res.render("products/productCart");
    }

}

module.exports = productController