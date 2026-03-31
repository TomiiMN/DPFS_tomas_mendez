const products = [
    {
        id: 1,
        name: "Logitech G703 Wireless HERO RGB",
        brand: "Logitech",
        model: "G703",
        price: 90000,
        oldPrice: 95000,
        discount: 5000,
        releaseDate: "2019-05-01",
        images: [
            "/images/details/mouse-G703/Imagen-mouse.jpg",
            "/images/details/mouse-G703/Imagen-mouse2.jpg",
            "/images/details/mouse-G703/Imagen-mouse3.jpg",
            "/images/details/mouse-G703/Imagen-mouse4.jpg"
        ],
        category: "Mouse",
        specs: {
            dpi: 16000,
            weight_g: 107,
            connection: "wireless",
            sensor: "HERO",
            battery_life_hours: 35
        },
        tags: ["gaming", "wireless", "rgb"],
        tier: "alta",
        state: "Publicado",
        flags: { featured: true, onSale: true }
    },
    {
        id: 2,
        name: "Microfono SteelSeries USB-C RGB",
        brand: "SteelSeries",
        model: "",
        price: 295950,
        oldPrice: 311525,
        discount: 15575,
        releaseDate: "2023-09-15",
        images: ["/images/details/microfono-SteelSeries/Imagen-microfono.jpg"],
        category: "Microfono",
        specs: {
            polar_pattern: "cardioide",
            type: "condensador",
            connection: "usb-c",
            frequency_response: "20Hz-20kHz"
        },
        tags: ["streaming", "rgb", "usb"],
        tier: "alta",
        state: "Publicado",
        flags: { featured: true, onSale: true }
    },
    {
        id: 3,
        name: "Teclado Redragon Mitra K551 RGB",
        brand: "Redragon",
        model: "K551",
        price: 60000,
        oldPrice: 63150,
        discount: 3150,
        releaseDate: "2018-03-10",
        images: [
            "/images/details/teclado-Redragon/Imagen-teclado.jpg",
            "/images/details/teclado-Redragon/Imagen-teclado2.jpg",
            "/images/details/teclado-Redragon/Imagen-teclado3.jpg",
            "/images/details/teclado-Redragon/Imagen-teclado4.jpg"
        ],
        category: "Teclado",
        specs: {
            switch: "red",
            layout: "full",
            connection: "usb",
            mechanical: true
        },
        tags: ["gaming", "rgb", "mecanico"],
        tier: "media",
        state: "Publicado",
        flags: { featured: true, onSale: true }
    },
    {
        id: 4,
        name: "Auriculares Redragon Lamia H320 7.1",
        brand: "Redragon",
        model: "H320",
        price: 68000,
        oldPrice: 71150,
        discount: 3150,
        releaseDate: "2020-07-20",
        images: [
            "/images/details/auriculares-Redragon/Imagen-auriculares.jpg",
            "/images/details/auriculares-Redragon/Imagen-auriculares2.jpg",
            "/images/details/auriculares-Redragon/Imagen-auriculares3.jpg"
        ],
        category: "Auriculares",
        specs: {
            microphone: true,
            sound: "7.1 surround",
            connection: "wired",
            rgb: true
        },
        tags: ["gaming", "rgb", "sonido envolvente"],
        tier: "media",
        state: "Publicado",
        flags: { featured: true, onSale: true }
    },
    {
        id: 5,
        name: "Mouse Pad Corsair MM350 PRO XL",
        brand: "Corsair",
        model: "MM350 PRO",
        price: 56600,
        oldPrice: 59580,
        discount: 3020,
        releaseDate: "2021-02-15",
        images: [
            "/images/details/mouse-pad-Corsair/Imagen-mouse-pad.jpg",
            "/images/details/mouse-pad-Corsair/Imagen-mouse-pad2.jpg",
            "/images/details/mouse-pad-Corsair/Imagen-mouse-pad3.jpg"
        ],
        category: "Mouse Pad",
        specs: {
            size: "xl",
            dimensions_mm: "930x400",
            material: "tela",
            surface: "speed"
        },
        tags: ["gaming", "xl", "precision"],
        tier: "media",
        state: "Publicado",
        flags: { featured: true, onSale: true }
    },
    {
        id: 6,
        name: "Mouse Redragon Griffin",
        brand: "Redragon",
        model: "Griffin",
        price: 20100,
        oldPrice: 21150,
        discount: 1050,
        releaseDate: "2019-11-05",
        images: [
            "/images/details/mouse-Redragon/Imagen-mouse2.jpg",
            "/images/details/mouse-Redragon/Imagen-mouse3.jpg"
        ],
        category: "Mouse",
        specs: {
            dpi: 7200,
            weight_g: 151,
            connection: "wired",
            rgb: true
        },
        tags: ["gaming", "rgb", "economico"],
        tier: "entrada",
        state: "Publicado",
        flags: { featured: true, onSale: true }
    },
    {
        id: 7,
        name: "RX 9070 XT 16GB",
        brand: "AMD",
        model: "RX 9070 XT",
        price: 1199750,
        oldPrice: 1199750,
        discount: 0,
        releaseDate: "2025-01-10",
        images: [
            "/images/details/placa-de-video-RX/Imagen-placa-de-video.jpg",
            "/images/details/placa-de-video-RX/Imagen-placa-de-video2.jpg",
            "/images/details/placa-de-video-RX/Imagen-placa-de-video3.jpg"
        ],
        category: "Placa de Video",
        specs: {
            vram_gb: 16,
            memory_type: "GDDR6",
            architecture: "RDNA",
            recommended_psu_w: 750
        },
        tags: ["gaming", "alta", "4k"],
        tier: "alta",
        state: "Publicado",
        flags: { featured: false, onSale: false }
    },
    {
        id: 8,
        name: "ASUS Vivobook Go 15",
        brand: "ASUS",
        model: "Vivobook Go 15",
        price: 706900,
        oldPrice: 706900,
        discount: 0,
        releaseDate: "2024-06-01",
        images: [
            "/images/details/note-books/Imagen-notebook.jpg",
            "/images/details/note-books/Imagen-notebook2.jpg",
            "/images/details/note-books/Imagen-notebook3.jpg"
        ],
        category: "Notebook",
        specs: {
            cpu: "Ryzen 5 7520U",
            ram_gb: 8,
            storage_gb: 512,
            storage_type: "ssd",
            screen_size: 15.6
        },
        tags: ["oficina", "portatil"],
        tier: "entrada",
        state: "Publicado",
        flags: { featured: false, onSale: false }
    },
    {
        id: 9,
        name: "Razer Iskur",
        brand: "Razer",
        model: "Iskur",
        price: 484650,
        oldPrice: 484650,
        discount: 0,
        releaseDate: "2025-01-15",
        images: ["/images/details/silla-gamer-Razer/Imagen-silla-gamer.jpg"],
        category: "Silla Gamer",
        specs: {
            material: "tela",
            max_weight_kg: 136,
            recline_deg: 180
        },
        tags: ["gaming", "premium"],
        tier: "alta",
        state: "Publicado",
        flags: { featured: false, onSale: false }
    },
    {
        id: 10,
        name: "Samsung Odyssey G9",
        brand: "Samsung",
        model: "G9",
        price: 1764900,
        oldPrice: 1764900,
        discount: 0,
        releaseDate: "2024-08-01",
        images: [
            "/images/details/monitor-samsung/Imagen-monitor.jpg",
            "/images/details/monitor-samsung/Imagen-monitor2.jpg",
            "/images/details/monitor-samsung/Imagen-monitor3.jpg"
        ],
        category: "Monitor",
        specs: {
            size_inches: 49,
            resolution: "5120x1440",
            refresh_rate_hz: 144,
            panel: "VA"
        },
        tags: ["gaming", "ultrawide", "alta"],
        tier: "alta",
        state: "Publicado",
        flags: { featured: false, onSale: false }
    },
    {
        id: 11,
        name: "ASUS Vivobook 15",
        brand: "ASUS",
        model: "Vivobook 15",
        price: 962400,
        oldPrice: 962400,
        discount: 0,
        releaseDate: "2024-02-10",
        images: [
            "/images/details/note-books/Imagen-notebook.jpg",
            "/images/details/note-books/Imagen-notebook2.jpg",
            "/images/details/note-books/Imagen-notebook3.jpg"
        ],
        category: "Notebook",
        specs: {
            cpu: "Ryzen 7 7825U",
            ram_gb: 16,
            storage_gb: 512,
            storage_type: "ssd"
        },
        tags: ["oficina", "rendimiento"],
        tier: "media",
        state: "Publicado",
        flags: { featured: false, onSale: false }
    },
    {
        id: 12,
        name: "ASUS PRIME A520M-K",
        brand: "ASUS",
        model: "A520M-K",
        price: 86750,
        oldPrice: 86750,
        discount: 0,
        releaseDate: "2020-08-18",
        images: [
            "/images/details/mother-ASUS/Imagen-Motherboard.jpg",
            "/images/details/mother-ASUS/Imagen-mother2.jpg",
            "/images/details/mother-ASUS/Imagen-mother3.jpg"
        ],
        category: "Motherboard",
        specs: {
            socket: "AM4",
            chipset: "A520",
            form_factor: "m-atx",
            ram_type: "DDR4"
        },
        tags: ["entrada", "am4"],
        tier: "entrada",
        state: "Publicado",
        flags: { featured: false, onSale: false }
    },
    {
        id: 13,
        name: "ASUS Vivobook Go 15 DDR5",
        brand: "ASUS",
        model: "Vivobook Go 15",
        price: 719450,
        oldPrice: 719450,
        discount: 0,
        releaseDate: "2024-05-20",
        images: [
            "/images/details/note-books/Imagen-notebook.jpg",
            "/images/details/note-books/Imagen-notebook2.jpg",
            "/images/details/note-books/Imagen-notebook3.jpg"
        ],
        category: "Notebook",
        specs: {
            cpu: "Ryzen 5 7520U",
            ram_gb: 8,
            ram_type: "DDR5",
            storage_gb: 512
        },
        tags: ["oficina", "ddr5"],
        tier: "entrada",
        state: "Publicado",
        flags: { featured: false, onSale: false }
    },
    {
        id: 14,
        name: "ASUS VY229HF-J",
        brand: "ASUS",
        model: "VY229HF-J",
        price: 149450,
        oldPrice: 149450,
        discount: 0,
        releaseDate: "2023-03-12",
        images: [
            "/images/details/monitor-ASUS/Imagen-Monitor-ASUS.jpg",
            "/images/details/monitor-ASUS/Imagen-monitor-ASUS2.jpg",
            "/images/details/monitor-ASUS/Imagen-monitor-ASUS3.jpg"
        ],
        category: "Monitor",
        specs: {
            size_inches: 22,
            resolution: "1920x1080",
            refresh_rate_hz: 100,
            panel: "IPS"
        },
        tags: ["gaming", "economico"],
        tier: "entrada",
        state: "Publicado",
        flags: { featured: false, onSale: false }
    },
    {
        id: 15,
        name: "ASUS VY229HF-J (Alt)",
        brand: "ASUS",
        model: "VY229HF-J",
        price: 168550,
        oldPrice: 168550,
        discount: 0,
        releaseDate: "2023-03-12",
        images: [
            "/images/details/monitor-ASUS2/Imagen-Monitor.jpg",
            "/images/details/monitor-ASUS2/Imagen-monitor-2.jpg",
            "/images/details/monitor-ASUS2/Imagen-monitor-3.jpg"
        ],
        category: "Monitor",
        specs: {
            size_inches: 22,
            resolution: "1920x1080",
            refresh_rate_hz: 100,
            panel: "IPS"
        },
        tags: ["gaming"],
        tier: "entrada",
        state: "Publicado",
        flags: { featured: false, onSale: false }
    },
    {
        id: 16,
        name: "ASUS Dual RTX 5060 OC",
        brand: "ASUS",
        model: "RTX 5060",
        price: 687950,
        oldPrice: 687950,
        discount: 0,
        releaseDate: "2025-02-20",
        images: [
            "/images/details/placa-de-video-ASUS/Imagen-Placa-de-video.jpg",
            "/images/details/placa-de-video-ASUS/Imagen-placa-de-video-ASUS2.jpg",
            "/images/details/placa-de-video-ASUS/Imagen-placa-de-video-ASUS3.jpg"
        ],
        category: "Placa de Video",
        specs: {
            vram_gb: 8,
            memory_type: "GDDR7",
            architecture: "RTX",
            recommended_psu_w: 550
        },
        tags: ["gaming", "rtx"],
        tier: "media",
        state: "Publicado",
        flags: { featured: false, onSale: false }
    }
];

module.exports = products;