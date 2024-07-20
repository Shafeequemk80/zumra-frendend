import React, { useState, useEffect } from "react";
import axios from "axios";
import TableReact from "./Table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const rowsLimit = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const load = toast.loading("Loading..");
        const response = await axios.get("https://zumra-backend.onrender.com/");
        if (Array.isArray(response.data)) {
          toast.dismiss(load);
          setData(response.data);
          setCount(response.data.length);
        } else {
          console.error("  Received data is not an array:", response.data);
          setError("Unexpected data format");
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast.dismiss();
        toast.error("Error loading data");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const load = toast.loading("Loading..");
      const response = await axios.post("https://zumra-backend.onrender.com/", {
        name,
        unit,
      });
      console.log("Data sent successfully:", response.data);
      setCount((prev) => prev + 1);
      toast.dismiss(load);
      toast.success("Data added successfully!");

      setData((prev) => [response.data.data, ...prev]);

      const newTotalPages = Math.ceil((data.length + 1) / rowsLimit);
      setCurrentPage(newTotalPages - 1);

      setName("");
      setUnit("");
    } catch (error) {
      console.error("Error sending data:", error);
      toast.dismiss();
      toast.error("Error sending data");
    }
  };

  
  const downloadFile = async () => {
    const url = 'https://zumra-backend.onrender.com/download'; // Replace with your API endpoint

    try {
      const response = await axios({
        url,
        method: 'GET',
        responseType: 'blob', // Set response type to 'blob' for binary data
      });

      // Create a URL for the file
      const fileURL = URL.createObjectURL(new Blob([response.data]));
      
      // Create a link element
      const link = document.createElement('a');
      link.href = fileURL;
      link.download = 'Zumra.pdf'; // Name of the file to be downloaded
      document.body.appendChild(link);
      
      // Trigger a click event on the link
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(fileURL); // Release memory
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };
  return (
    <div className="bg-gray-100">
    <nav className="bg-light p-4">
      <a className="flex items-center" href="#">
        <img src="/ZUMRA.png" width="85" height="30" alt="ZUMRA Logo" />
      </a>
    </nav>
  
    <div className="container mx-auto mt-6 justify-center ">
      <h1 className="text-center text-3xl font-bold mb-4">ZUMRA</h1>
      <h4 className="text-center text-xl mb-4">ഖുറതുൽ ഫുആദ്</h4>
      <h1 className="text-center text-xl mb-4">
        Zumra Count <span className="font-bold text-red-500">{count}</span>
      </h1>
  
      <div className="flex justify-center">
        <button
          onClick={ downloadFile}
          className="text-center justify-center mb-4 bg-green-500 text-white px-5 shadow-sm hover:bg-green-600"
        >
          Class Note
        </button>
      </div>
    
      <div className="flex justify-center px-6">
        <form
          id="nameForm"
          className="w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              htmlFor="nameInput"
              className="block text-sm font-medium mb-1"
            >
              Enter name:
            </label>
            <input
              type="text"
              className="form-input w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="nameInput"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="myDropdown"
              className="block text-sm font-medium mb-1"
            >
              Select unit:
            </label>
            <select
              id="myDropdown"
              className="form-select w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              required
            >
              <option value="" disabled>
                Unit
              </option>
              <option value="Velliparamba">Velliparamba</option>
              <option value="5th mile">5th mile</option>
              <option value="6th mile">6th mile</option>
              <option value="Al fathah">Al fathah</option>
              <option value="Kuttikkattoor">Kuttikkattoor</option>
              <option value="Kuttipadam">Kuttipadam</option>
              <option value="Kaniyath">Kaniyath</option>
              <option value="Perya">Perya</option>
              <option value="Anakuzhikkara">Anakuzhikkara</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mb-10 shadow-sm hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        <ToastContainer />
      </div>
      <TableReact
        data={data}
        loading={loading}
        error={error}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      
    </div>
  </div>
  
  );
};

export default App;
