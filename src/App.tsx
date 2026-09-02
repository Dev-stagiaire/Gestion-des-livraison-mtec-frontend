import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from './pages/login/login';
import './i18n';
import AppLayout from './layouts/AppLayout';
import { ProtectedRoute } from './layouts/ProtectedRoute';
import { PublicRoute } from './layouts/PublicRoute';
import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/users/users';
import Role from './pages/users/role/role';
import Permissions from './pages/users/permission/permissions';
import UsersLayout from './pages/users/userLayout';

function App() {  

  return(
    <Router>
       <Routes>
          <Route element={<PublicRoute />}>
              <Route path='/login' element={<Login/>}></Route>
          </Route>

          <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout/>}>
                  <Route path='/dashboard' element={<Dashboard />}></Route>
               
                  <Route element={<UsersLayout />}>
                      <Route path='/users' element={<Users />}></Route>
                      <Route path='/users/role' element={<Role />}></Route>
                      <Route path='/users/permissions' element={<Permissions />}></Route>
                  </Route>

                  <Route path='/tour'></Route>
                  <Route path='/delivery'></Route>
              </Route>
          </Route>
       </Routes>
    </Router>
  );
}
export default App