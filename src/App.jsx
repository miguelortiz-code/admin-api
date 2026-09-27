import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { AppRoutes } from "./routes/AppRoutes";
import { CRMProvider } from "./context/CRMContext";

function App() {
  return (
    <CRMProvider>
      <Header />

      <div className="grid contenedor contenido-principal">
        <Sidebar />

        <main className="caja-contenido col-9">
          <AppRoutes />
        </main>
      </div>
    </CRMProvider>
  );
}

export default App;