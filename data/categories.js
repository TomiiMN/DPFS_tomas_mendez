const categories = [
    {
        id: 1,
        name: "Procesador",
        slug: "procesador",
        parent_id: null
    },
    {
        id: 2,
        name: "Procesador AMD",
        slug: "procesador-amd",
        parent_id: 1
    },
    {
        id: 3,
        name: "Procesador Intel",
        slug: "procesador-intel",
        parent_id: 1
    },
    {
        id: 4,
        name: "Placa de video",
        slug: "placa-de-video",
        parent_id: null
    },
    {
        id: 5,
        name: "Placa de video GeForce",
        slug: "placa-de-video-geforce",
        parent_id: 4
    },
    {
        id: 6,
        name: "Placa de video Radeon AMD",
        slug: "placa-de-video-radeon-amd",
        parent_id: 4
    },
    {
        id: 7,
        name: "Placa de video Intel ARC",
        slug: "placa-de-video-intel-arc",
        parent_id: 4
    },
    {
        id: 8,
        name: "Memoria RAM",
        slug: "memoria-ram",
        parent_id: null
    },
    {
        id: 9,
        name: "Memoria",
        slug: "memoria",
        parent_id: 8
    },
    {
        id: 10,
        name: "Memoria Notebook",
        slug: "memoria-notebook",
        parent_id: 8
    },
    {
        id: 11,
        name: "Almacenamiento",
        slug: "almacenamiento",
        parent_id: null
    },
    {
        id: 12,
        name: "Disco Externo",
        slug: "disco-externo",
        parent_id: 11
    },
    {
        id: 13,
        name: "Disco Rigido",
        slug: "disco-rigido",
        parent_id: 11
    },
    {
        id: 14,
        name: "Disco Solido SSD",
        slug: "disco-solido-ssd",
        parent_id: 11
    },
    {
        id: 15,
        name: "Motherboard",
        slug: "motherboard",
        parent_id: null
    },
    {
        id: 16,
        name: "Motherboard AMD",
        slug: "motherboard-amd",
        parent_id: 15
    },
    {
        id: 17,
        name: "Motherboard Intel",
        slug: "motherboard-intel",
        parent_id: 15
    },
    {
        id: 18,
        name: "Refrigeración",
        slug: "refrigeracion",
        parent_id: null
    },
    {
        id: 19,
        name: "Cooler Fan",
        slug: "cooler-fan",
        parent_id: 18
    },
    {
        id: 20,
        name: "Cooler CPU",
        slug: "cooler-CPU",
        parent_id: 18
    },
    {
        id: 21,
        name: "Pasta Termica",
        slug: "pasta-termica",
        parent_id: 18
    },
    {
        id: 22,
        name: "Fuente de alimentacion",
        slug: "fuente-de-alimentacion",
        parent_id: null
    },
    {
        id: 23,
        name: "Fuente de alimentacion",
        slug: "fuente-de-alimentacion",
        parent_id: 22
    },
    {
        id: 24,
        name: "Gabinete",
        slug: "gabinete",
        parent_id: null
    },
    {
        id: 25,
        name: "Gabinete",
        slug: "gabinete",
        parent_id: 24
    },
    {
        id: 26,
        name: "Cable, iluminacion y otro",
        slug: "Cable-iluminacion-otro",
        parent_id: 24
    },
    {
        id: 27,
        name: "Silla gamer",
        slug: "silla-gamer",
        parent_id: null
    },
    {
        id: 28,
        name: "Silla gamer",
        slug: "silla-gamer",
        parent_id: 27
    },
    {
        id: 29,
        name: "Periférico",
        slug: "periferico",
        parent_id: null
    },
    {
        id: 30,
        name: "Auricular",
        slug: "auricular",
        parent_id: 29
    },
    {
        id: 31,
        name: "Teclado",
        slug: "teclado",
        parent_id: 29
    },
    {
        id: 32,
        name: "Mouse",
        slug: "mouse",
        parent_id: 29
    },
    {
        id: 33,
        name: "Webcam",
        slug: "webcam",
        parent_id: 29
    },
    {
        id: 34,
        name: "Joystick",
        slug: "joystick",
        parent_id: 29
    },
    {
        id: 35,
        name: "Mouse Pad",
        slug: "mouse-pad",
        parent_id: 29
    },
    {
        id: 36,
        name: "Parlante",
        slug: "parlante",
        parent_id: 29
    },
    {
        id: 37,
        name: "Microfono",
        slug: "microfono",
        parent_id: 29
    },
    {
        id: 38,
        name: "Volante",
        slug: "volante",
        parent_id: 29
    },
    {
        id: 39,
        name: "Steam Deck",
        slug: "steam-deck",
        parent_id: 29
    },
    {
        id: 40,
        name: "Monitor",
        slug: "monitor",
        parent_id: null
    },
    {
        id: 41,
        name: "Monitor y Pantalla",
        slug: "monitor-y-pantalla",
        parent_id: 40
    },
    {
        id: 42,
        name: "Notebook",
        slug: "notebook",
        parent_id: null
    },
    {
        id: 43,
        name: "Notebook",
        slug: "notebook",
        parent_id: 42
    },
]

module.exports = categories