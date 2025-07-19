import {
    Home,
    Customizer
} from "./pages";
import CanvasModel from "./canvas/index.jsx";

const App = () => {
    return (
        <main className="app">
            <Home />
            <Customizer />
            <CanvasModel />
        </main>
    );
};

export default App;