import { Chart } from "./components/Chart";
import { ReactFlowProvider } from "reactflow";

// TODO: Add Info Section
// TODO: Add header bar

function App() {
  return (
    <ReactFlowProvider>
      <Chart />
    </ReactFlowProvider>
  );
}

export default App;
