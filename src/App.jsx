import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Header />

      <div className="grid contenedor contenido-principal">
        <Sidebar />

        <main className="caja-contenido col-9">
          <AppRoutes />         
        </main>
      </div>
    </>
  );
}

export default App;