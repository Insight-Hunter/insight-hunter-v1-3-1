// app/components/Layout.tsx (snippet)
import { Outlet, NavLink, useLocation } from 'react-router-dom'
export default function Layout() {
  const { pathname } = useLocation()
  const showTabs = pathname !== '/'  // hide on Welcome
  // ...
}
