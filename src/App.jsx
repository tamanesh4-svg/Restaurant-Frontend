import { RouterProvider } from "react-router-dom";
import Routes from "./Routes/Routes";
import { Toaster } from "sonner";
function App() {
  return (
    <div className="">
      <Toaster richColors closeButton position="top-right"/>
      <RouterProvider router={Routes} />
    </div>
  );
}

export default App