import { Navigate } from 'react-router-dom';
import { useAuth } from '../Hooks/UseAuth';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-primary/30 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-primary/30 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-primary/30 rounded"></div>
              <div className="h-4 bg-primary/30 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
