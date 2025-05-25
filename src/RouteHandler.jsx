import { useSelector } from 'react-redux';
import PublicRoutes from './Routes/PublicRoutes';
import PrivateRoutes from './Routes/PrivateRoutes';

function RouteHandler() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log('RouteHandler isAuthenticated:', isAuthenticated); // Debug
  return isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />;
}

export default RouteHandler;