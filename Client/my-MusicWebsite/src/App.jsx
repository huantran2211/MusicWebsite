import AppRoutes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <div>
      {/* Sử dụng routes được import từ file riêng */}
      <ToastContainer theme='dark' />
      <AppRoutes />
    </div>
    </>
  )
}

export default App
