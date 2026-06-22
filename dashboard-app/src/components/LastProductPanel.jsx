export default function LastProductPanel({ products }) {
    const last = products.reduce(
        (prev, curr) => (curr.id > prev.id ? curr : prev),
        products[0]
    )

    if (!last) return null

    const brand      = typeof last.brand === 'string' ? last.brand : last.brand?.name ?? '—'
    const categories = last.categories ?? []

    return (
        <div className="panel">
            <div className="panel-header">
                <span className="panel-title">Último producto cargado</span>
                <span className="panel-badge">#{last.id}</span>
            </div>
            <div className="panel-body">
                {last.img && (
                    <img src={last.img} alt={last.name} className="last-item-img" />
                )}
                <div className="last-item-name">{last.name}</div>
                <div className="last-item-meta">
                    <span className="meta-chip primary">{brand}</span>
                    {last.tier        && <span className="meta-chip">{last.tier}</span>}
                    {categories[0]    && <span className="meta-chip">{categories[0].name}</span>}
                    {last.on_sale     && <span className="meta-chip">En oferta</span>}
                    {last.featured    && <span className="meta-chip">Destacado</span>}
                </div>
                <div className="last-item-price">
                    $ {last.price.toLocaleString('es-AR')}
                </div>
                <a href={`/admin/products/${last.id}`} className="last-item-link">
                    Ver en el panel →
                </a>
            </div>
        </div>
    )
}
