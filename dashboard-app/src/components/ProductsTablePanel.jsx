import { useState } from 'react'

export default function ProductsTablePanel({ products }) {
    const [search,  setSearch]  = useState('')
    const [sortDir, setSortDir] = useState('asc')

    const filtered = products
        .filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            (typeof p.brand === 'string' ? p.brand : p.brand?.name ?? '')
                .toLowerCase()
                .includes(search.toLowerCase())
        )
        .sort((a, b) =>
            sortDir === 'asc' ? a.price - b.price : b.price - a.price
        )

    return (
        <div className="panel products-panel">
            <div className="panel-header">
                <span className="panel-title">Listado de productos</span>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{
                            background: '#1f1f1f',
                            border: '1px solid #2a2a2a',
                            borderRadius: '6px',
                            color: '#fff',
                            padding: '5px 10px',
                            fontSize: '12px',
                            outline: 'none',
                        }}
                    />
                    <button
                        onClick={() => setSortDir(d => d === 'asc' ? 'desc' : 'asc')}
                        style={{
                            background: 'none',
                            border: '1px solid #2a2a2a',
                            borderRadius: '6px',
                            color: '#a1a1aa',
                            padding: '5px 10px',
                            fontSize: '12px',
                            cursor: 'pointer',
                        }}
                    >
                        Precio {sortDir === 'asc' ? '↑' : '↓'}
                    </button>
                </div>
            </div>
            <div className="products-table-wrapper">
                {filtered.length === 0 ? (
                    <div className="empty-state">Sin resultados para "{search}"</div>
                ) : (
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Marca</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(product => {
                                const brand = typeof product.brand === 'string'
                                    ? product.brand
                                    : product.brand?.name ?? '—'
                                const cat         = product.categories?.[0]?.name ?? '—'
                                const isPublished = product.state

                                return (
                                    <tr key={product.id}>
                                        <td>
                                            <div className="product-name-cell">
                                                <img
                                                    src={product.img}
                                                    alt={product.name}
                                                    className="product-thumb"
                                                />
                                                <span>{product.name}</span>
                                            </div>
                                        </td>
                                        <td>{brand}</td>
                                        <td>{cat}</td>
                                        <td>$ {product.price.toLocaleString('es-AR')}</td>
                                        <td>
                                            <span className={`badge ${isPublished ? 'badge-published' : 'badge-draft'}`}>
                                                {isPublished ? 'Publicado' : 'Borrador'}
                                            </span>
                                            {product.on_sale && (
                                                <span className="badge badge-sale" style={{ marginLeft: '4px' }}>
                                                    Oferta
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            <a href={`/admin/products/${product.id}`} className="table-link">
                                                Ver →
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
