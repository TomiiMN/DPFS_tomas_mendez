import { useApi } from './hooks/useApi'
import StatsPanel          from './components/StatsPanel'
import LastProductPanel    from './components/LastProductPanel'
import CategoriesPanel     from './components/CategoriesPanel'
import ProductsTablePanel  from './components/ProductsTablePanel'

export default function Dashboard() {
    const { data: products,   loading: lp, error: ep                 } = useApi('/api/products')
    const { data: users,      loading: lu, error: eu, meta: usersMeta } = useApi('/api/users')
    const { data: categories, loading: lc, error: ec                 } = useApi('/api/categories')

    if (lp || lu || lc) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner"></div>
                <p>Cargando datos...</p>
            </div>
        )
    }

    if (ep || eu || ec) {
        return (
            <div className="empty-state">
                Error al cargar los datos: {ep || eu || ec}
            </div>
        )
    }

    return (
        <div>
            <StatsPanel products={products} users={users} adminCount={usersMeta.adminCount} />

            <div className="main-grid">
                <LastProductPanel   products={products} />
                <CategoriesPanel   products={products} categories={categories} />
            </div>

            <ProductsTablePanel products={products} />
        </div>
    )
}
