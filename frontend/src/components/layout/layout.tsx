import { Outlet } from "react-router-dom";

function Layout () {
  return (
    <div>
      {/* TODO: ADD HEADER */}
      header
      <Outlet />
      footer
      {/* TODO: ADD FOOTER */}
    </div>
  )
}

export default Layout;