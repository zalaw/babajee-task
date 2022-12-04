import Table from "./components/Table";
import UserModal from "./components/UserModal";
import { useSelector } from "react-redux";
import DeleteModal from "./components/DeleteModal";
import Toast from "./components/Toast";

function App() {
  const { ui } = useSelector(state => state);

  return (
    <div className="app">
      {ui.toast.message !== null && <Toast />}
      {ui.showUserModal && <UserModal />}
      {ui.showDeleteModal && <DeleteModal />}

      <div className="wrapper">
        <Table />
      </div>
    </div>
  );
}

export default App;
