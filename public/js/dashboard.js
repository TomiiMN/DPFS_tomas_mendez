const { useState, useEffect } = React;
function useApi(url) {
    const [data,    setData]    = useState(null);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState(null);
    const [meta,    setMeta]    = useState({});
    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(json => {
                const { data, ...rest } = json;
                setData(data);
                setMeta(rest);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [url]);
    return { data, loading, error, meta };
}
function StatsPanel({ products, users, adminCount }) {
    const total       = products.length;
    const published   = products.filter(p => p.state).length;
    const onSale      = products.filter(p => p.on_sale).length;
    const featured    = products.filter(p => p.featured).length;
    const totalUsers  = users.length;
    const admins      = adminCount ?? 0;
    const cards = [
        { icon: '◈', label: 'Total productos',  value: total,      color: 'purple' },
        { icon: '◉', label: 'Publicados',        value: published,  color: 'green'  },
        { icon: '◇', label: 'En oferta',         value: onSale,     color: 'amber'  },
        { icon: '★', label: 'Destacados',        value: featured,   color: 'teal'   },
        { icon: '◎', label: 'Usuarios',          value: totalUsers, color: 'blue'   },
        { icon: '⬡', label: 'Admins',   value: admins,     color: 'red'    },
    ];
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
    );
}
function LastProductPanel({ products }) {
    const last = products.reduce((prev, curr) => (curr.id > prev.id ? curr : prev), products[0]);
    if (!last) return null;
    const brand      = typeof last.brand === 'string' ? last.brand : last.brand?.name ?? '—';
    const categories = last.categories ?? [];
    return (
        <div className="panel">
            <div className="panel-header">
                <span className="panel-title">Último producto cargado</span>
                <span className="panel-badge">#{last.id}</span>
            </div>
            <div className="panel-body">
                {last.img && (
                    <img
                        src={last.img}
                        alt={last.name}
                        className="last-item-img"
                    />
                )}
                <div className="last-item-name">{last.name}</div>
                <div className="last-item-meta">
                    <span className="meta-chip primary">{brand}</span>
                    {last.tier && <span className="meta-chip">{last.tier}</span>}
                    {categories[0] && <span className="meta-chip">{categories[0].name}</span>}
                    {last.on_sale  && <span className="meta-chip">En oferta</span>}
                    {last.featured && <span className="meta-chip">Destacado</span>}
                </div>
                <div className="last-item-price">
                    $ {last.price.toLocaleString('es-AR')}
                </div>
                <a
                    href={`/admin/products/${last.id}`}
                    className="last-item-link"
                >
                    Ver en el panel →
                </a>
            </div>
        </div>
    );
}
function CategoriesPanel({ products, categories }) {
    const parents = categories.filter(c => c.parent_id === null);
    const childIds = (parentId) =>
        categories
            .filter(c => c.parent_id === parentId)
            .map(c => c.id);
    const countForParent = (parentId) => {
        const ids = [parentId, ...childIds(parentId)];
        return products.filter(p =>
            (p.categories ?? []).some(cat => ids.includes(cat.id))
        ).length;
    };
    const rows = parents
        .map(cat => ({ ...cat, count: countForParent(cat.id) }))
        .filter(cat => cat.count > 0)
        .sort((a, b) => b.count - a.count);

    const max = rows[0]?.count || 1;
    return (
        <div className="panel">
            <div className="panel-header">
                <span className="panel-title">Productos por categoría</span>
                <span className="panel-badge">{rows.length} categorías</span>
            </div>
            <div className="panel-body">
                <ul className="category-list">
                    {rows.map(cat => (
                        <li key={cat.id} className="category-row">
                            <span className="category-name">{cat.name}</span>
                            <div className="category-bar-track">
                                <div
                                    className="category-bar-fill"
                                    style={{ width: `${(cat.count / max) * 100}%` }}
                                />
                            </div>
                            <span className="category-count">{cat.count}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
function ProductsTablePanel({ products }) {
    const [search,  setSearch]  = useState('');
    const [sortDir, setSortDir] = useState('asc');
    const filtered = products
        .filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            (typeof p.brand === 'string' ? p.brand : p.brand?.name ?? '')
                .toLowerCase()
                .includes(search.toLowerCase())
        )
        .sort((a, b) =>
            sortDir === 'asc' ? a.price - b.price : b.price - a.price
        );
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
                                    : product.brand?.name ?? '—';
                                const cat = product.categories?.[0]?.name ?? '—';
                                const isPublished = product.state;

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
                                            <a
                                                href={`/admin/products/${product.id}`}
                                                className="table-link"
                                            >
                                                Ver →
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
function Dashboard() {
    const { data: products,   loading: lp, error: ep                      } = useApi('/api/products');
    const { data: users,      loading: lu, error: eu, meta: usersMeta      } = useApi('/api/users');
    const { data: categories, loading: lc, error: ec                      } = useApi('/api/categories');
    if (lp || lu || lc) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner"></div>
                <p>Cargando datos...</p>
            </div>
        );
    }
    if (ep || eu || ec) {
        return (
            <div className="empty-state">
                Error al cargar los datos: {ep || eu || ec}
            </div>
        );
    }
    return (
        <div>
            {/* Fila 1: stat cards */}
            <StatsPanel products={products} users={users} adminCount={usersMeta.adminCount} />

            {/* Fila 2: último producto + categorías */}
            <div className="main-grid">
                <LastProductPanel products={products} />
                <CategoriesPanel  products={products} categories={categories} />
            </div>

            {/* Fila 3: tabla de todos los productos */}
            <ProductsTablePanel products={products} />
        </div>
    );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Dashboard />);
