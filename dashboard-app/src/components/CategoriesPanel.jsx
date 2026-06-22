export default function CategoriesPanel({ products, categories }) {
    const parents = categories.filter(c => c.parent_id === null)

    const childIds = (parentId) =>
        categories.filter(c => c.parent_id === parentId).map(c => c.id)

    const countForParent = (parentId) => {
        const ids = [parentId, ...childIds(parentId)]
        return products.filter(p =>
            (p.categories ?? []).some(cat => ids.includes(cat.id))
        ).length
    }

    const rows = parents
        .map(cat => ({ ...cat, count: countForParent(cat.id) }))
        .filter(cat => cat.count > 0)
        .sort((a, b) => b.count - a.count)

    const max = rows[0]?.count || 1

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
    )
}
