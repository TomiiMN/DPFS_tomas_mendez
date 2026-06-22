export default function StatsPanel({ products, users, adminCount }) {
    const total      = products.length
    const published  = products.filter(p => p.state).length
    const onSale     = products.filter(p => p.on_sale).length
    const featured   = products.filter(p => p.featured).length
    const totalUsers = users.length
    const admins     = adminCount ?? 0

    const cards = [
        { icon: '◈', label: 'Total productos', value: total,      color: 'purple' },
        { icon: '◉', label: 'Publicados',       value: published,  color: 'green'  },
        { icon: '◇', label: 'En oferta',        value: onSale,     color: 'amber'  },
        { icon: '★', label: 'Destacados',       value: featured,   color: 'teal'   },
        { icon: '◎', label: 'Usuarios',         value: totalUsers, color: 'blue'   },
        { icon: '⬡', label: 'Admins',           value: admins,     color: 'red'    },
    ]

    return (
        <div className="stats-grid">
            {cards.map(card => (
                <div key={card.label} className="stat-card">
                    <div className={`stat-icon ${card.color}`}>{card.icon}</div>
                    <div>
                        <div className="stat-label">{card.label}</div>
                        <div className={`stat-value ${card.color}`}>{card.value}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
