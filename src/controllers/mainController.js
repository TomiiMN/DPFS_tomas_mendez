const featuredProducts = [
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

const latestProducts = [
    {
        id: 7,
        name: "RX 9070 XT 16GB Ultra Power",
        brand: "AMD",
        price: "1.199.750",
        oldPrice: "1.199.750",
        discount: "0",
        image: "/images/home/Novedades/Imagen-Placa-de-video.jpg",
        images: [],
        category: "Placa de video",
        specs: {
            chipset: "RX 9070 XT",
            vram: "16GB",
            memory: "GDDR6"
        }
    },
    {
        id: 8,
        name: "Vivobook Go 15 R5 512GB SSD",
        brand: "ASUS",
        price: "706.900",
        oldPrice: "706.900",
        discount: "0",
        image: "/images/home/Novedades/Imagen-notebook.jpg",
        images: [],
        category: "Notebook",
        specs: {
            cpu: "Ryzen 5 7520U",
            ram: "8GB",
            storage: "512GB"
        }
    },
    {
        id: 9,
        name: "Razer Iskur Tela 2D",
        brand: "Razer",
        price: "484.650",
        oldPrice: "484.650",
        discount: "0",
        image: "/images/home/Novedades/Imagen-silla-gamer.jpg",
        images: [],
        category: "Silla gamer",
        specs: {
            material: "Tela",
            maxWeight: "136KG",
            recline: "180°"
        }
    },
    {
        id: 10,
        name: "Samsung G9 Potencia Total",
        brand: "Samsung",
        price: "1.764.900",
        oldPrice: "1.764.900",
        discount: "0",
        image: "/images/home/Novedades/Imagen-monitor.jpg",
        images: [],
        category: "Monitores",
        specs: {
            size: "49 inches",
            resolution: "1440p",
            refreshRate: "144Hz"
        }
    },
    {
        id: 11,
        name: "Vivobook 15R7 Potencia PRO",
        brand: "ASUS",
        price: "962.400",
        oldPrice: "962.400",
        discount: "0",
        image: "/images/home/Novedades/Imagen-notebook.jpg",
        images: [],
        category: "Notebook",
        specs: {
            cpu: "Ryzen 7 7825U",
            ram: "16GB",
            storage: "512GB"
        }
    }
]

const brandProducts = [
    {
        id: 12,
        name: "ASUS PRIME A520-M K DDR4 AM4",
        brand: "ASUS",
        price: "86.750",
        oldPrice: "86.750",
        discount: "0",
        image: "/images/home/Marcas/Imagen-Motherboard.jpg",
        images: [],
        category: "Motherboards",
        specs: {
            socket: "AM4",
            chipset: "AMD A520",
            formFactor: "M-ATX"
        }
    },
    {
        id: 13,
        name: "Vivobook GO 15 AMD Ryzen 5 7520U 8GB DDR5 SSD 512GB Win11",
        brand: "ASUS",
        price: "719.450",
        oldPrice: "719.450",
        discount: "0",
        image: "/images/home/Marcas/Imagen-Notebook.jpg",
        images: [],
        category: "Notebook",
        specs: {
            cpu: "Ryzen 5 7520U",
            ram: "8GB",
            storage: "512GB"
        }
    },
    {
        id: 14,
        name: "Monitor Gamer ASUS VY229HF-J FHD IPS 100Hz",
        brand: "ASUS",
        price: "149.450",
        oldPrice: "149.450",
        discount: "0",
        image: "/images/home/Marcas/Imagen-Monitor.jpg",
        images: [],
        category: "Monitores",
        specs: {
            size: "22 inches",
            resolution: "1920x1080p",
            refreshRate: "100Hz"
        }
    },
    {
        id: 15,
        name: "Monitor Gamer ASUS VY229HF-J FHD IPS 100Hz",
        brand: "ASUS",
        price: "168.550",
        oldPrice: "168.550",
        discount: "0",
        image: "/images/home/Marcas/Imagen-Monitor-2.jpg",
        images: [],
        category: "Monitores",
        specs: {
            size: "22 inches",
            resolution: "1920x1080p",
            refreshRate: "100Hz"
        }
    },
    {
        id: 16,
        name: "ASUS DUAL GeForce RTX 5060 8GB GDDR7 OC",
        brand: "ASUS",
        price: "687.950",
        oldPrice: "687.950",
        discount: "0",
        image: "/images/home/Marcas/Imagen-Placa-de-video.jpg",
        images: [],
        category: "Placa de video",
        specs: {
            chipset: "RTX 5060",
            vram: "8GB",
            memory: "GDDR7"
        }
    }
]

const mainController = {

    home: (req, res) => {
        res.render("products/home", {
            featuredProducts,
            latestProducts,
            brandProducts
        });
    }

}

module.exports = mainController;