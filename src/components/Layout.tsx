import { Link, Outlet, useLocation } from 'react-router-dom'

export default function Layout(){
  const { pathname } = useLocation()
  const showTabs = pathname !== '/'

  return (
    <div className="ih-layout">
      <header className="ih-topbar">
        <Link to="/" className="logo">Insight Hunter</Link>
        <nav className="ih-nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/forecast">Forecast</Link>
          <Link to="/analytics">Analytics</Link>
          <Link to="/reports">Reports</Link>
        </nav>
        <div className="ih-auth">
          <Link to="/signin">Sign in</Link>
          <Link to="/signup" className="btn-primary sm">Get started</Link>
        </div>
      </header>

      <main className="ih-main">
        <Outlet/>
      </main>

      {showTabs && (
        <div className="ih-tabbar">
          <Link to="/dashboard" className={pathname==='/dashboard'?'active':''}>Home</Link>
          <Link to="/forecast" className={pathname==='/forecast'?'active':''}>Forecast</Link>
          <Link to="/analytics" className={pathname==='/analytics'?'active':''}>Trends</Link>
          <Link to="/reports" className={pathname==='/reports'?'active':''}>Reports</Link>
          <Link to="/settings" className={pathname==='/settings'?'active':''}>Settings</Link>
        </div>
      )}
    </div>
  )
}
