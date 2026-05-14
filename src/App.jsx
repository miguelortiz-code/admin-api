import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
function App() {


  return (
    <>
      <Header />
      <div class="grid contenedor contenido-principal">
        <Sidebar />

        <main class="caja-contenido col-9">
           // TODO:  
        </main>
      </div>
    </>
  )
}

export default App
