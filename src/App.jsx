import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableReact from './Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const rowsLimit = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const load=toast.loading('Loading..')
        const response = await axios.get('https://zumra-backend.onrender.com/');
        if (Array.isArray(response.data)) {
          toast.dismiss(load)
          setData(response.data);
          setCount(response.data.length)
        } else {
          console.error('Received data is not an array:', response.data);
          setError('Unexpected data format');
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const load=toast.loading('Loading..')
      const response = await axios.post('https://zumra-backend.onrender.com/', { name, unit });
      console.log('Data sent successfully:', response.data);
      setCount((prev)=>prev+1)
      toast.success('successfully')
      toast.dismiss(load)
      // Update the data state with the new entry

      // setData([...response.data.data]);
      
      setData((prev)=>{
        return [response.data.data,...prev]
      });

      // Calculate the new page number based on the new data length
      const newTotalPages = Math.ceil(newData.length / rowsLimit);
      setCurrentPage(newTotalPages - 1);

      // Clear the form after successful submission
      setName('');
      setUnit('');
    } catch (error) {
      console.error('Error sending data:', error);
      // Optionally, handle error state
    }
  };
  return (
    <div className="bg-gray-100">
      <nav className="bg-light p-4">
        <a className="flex items-center" href="#">
          <img src="/ZUMRA.png" width="85" height="30" alt="ZUMRA Logo" />
        </a>
      </nav>

      <input type="hidden" id="dataserver" value="<%=data%>" />

      <div className="container mx-auto mt-6">
        <h1 className="text-center text-3xl font-bold mb-4">ZUMRA</h1>
        <h4 className="text-center text-xl mb-4">ഖുറതുൽ ഫുആദ്</h4>
        <h1 className="text-center text-xl mb-4"> 
  Zumra Count <span className="font-bold text-red-500">{count}</span>
</h1>
 

        <div className="flex justify-center px-6">
          <form id="nameForm" className="w-full max-w-md" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="nameInput" className="block text-sm font-medium mb-1">Enter name:</label>
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
              <label htmlFor="myDropdown" className="block text-sm font-medium mb-1">Select unit:</label>
              <select
                id="myDropdown"
                className="form-select w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                required
              >
                <option value="" disabled>Unit</option>
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
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
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
