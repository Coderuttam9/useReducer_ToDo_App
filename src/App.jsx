import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import HokDetais from "./components/todoshook/HokDetais";
import ClassComponent from "./components/ClassCompo/ClassComponent";

function App() {
  return (
    <>
      <HokDetais />
      <ClassComponent title="This is ClassComponent for state" />
    </>
  );
}

export default App;
