import React, { useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from "@material-tailwind/react";
const TableReact = ({ data, loading, error, currentPage, setCurrentPage }) => {
  const rowsLimit = 5;

  // Calculate total pages based on the data length
  const totalPage = useMemo(() => Math.ceil(data.length / rowsLimit), [data.length]);

  // Slice data to show only the rows for the current page
  const rowsToShow = useMemo(() => {
    const startIndex = currentPage * rowsLimit;
    return data.slice(startIndex, startIndex + rowsLimit);
  }, [data, currentPage]);

  // Generate pagination items
  const paginationItems = useMemo(() => {
    return Array.from({ length: totalPage }, (_, index) => index);
  }, [totalPage]);

  // Handle page navigation
  const nextPage = () => {
    if (currentPage < totalPage - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const changePage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
if (loading) {
  
  
 toast.success('Loading...');
}
  
  if (error) return <p>Error: {error}</p>;

  return (
    <>
    <div className="bg-white flex items-center justify-center pt-10 pb-20">
      <div className="w-full max-w-4xl px-2">
        <div className="w-full overflow-x-scroll md:overflow-auto max-w-7xl 2xl:max-w-none mt-2">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-[#222E3A]/[6%] text-base text-white font-semibold">
              <tr>
                <th className="py-3 px-3 text-[#212B36] font-bold">No</th>
                <th className="py-3 px-3 text-[#212B36] font-bold">Name</th>
                <th className="py-3 px-3 text-[#212B36] font-bold">Unit</th>
              </tr>
            </thead>
            <tbody>
              {rowsToShow.map((item, index) => (
                <tr
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#222E3A]/[6%]'}`}
                  key={item.name + item.unit}
                >
                  <td
                    className={`py-2 px-3 border-t ${
                      index === 0 ? 'border-t-2 border-black' : 'border-t'
                    } whitespace-nowrap`}
                  >
                    {currentPage * rowsLimit + index + 1}
                  </td>
                  <td
                    className={`py-2 px-3 border-t ${
                      index === 0 ? 'border-t-2 border-black' : 'border-t'
                    } whitespace-nowrap`}
                  >
                    {item.name}
                  </td>
                  <td
                    className={`py-2 px-3 border-t ${
                      index === 0 ? 'border-t-2 border-black' : 'border-t'
                    } whitespace-nowrap`}
                  >
                    {item.unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
          <div className="text-lg">
            Showing {currentPage * rowsLimit + 1} to{' '}
            {currentPage === totalPage - 1 ? data.length : (currentPage + 1) * rowsLimit}{' '}
            of {data.length} entries
          </div>
          <div className="flex">
            <ul
              className="flex justify-center items-center gap-x-2 z-30"
              role="navigation"
              aria-label="Pagination"
            >
              <li
                className={`flex items-center justify-center w-9 h-9 border rounded ${
                  currentPage === 0 ? 'bg-gray-300 cursor-not-allowed' : 'cursor-pointer'
                }`}
                onClick={previousPage}
              >
                <img
                  src="https://www.tailwindtap.com/assets/travelagency-admin/leftarrow.svg"
                  alt="Previous"
                />
              </li>
              {paginationItems.map((index) => (
                <li
                  className={`flex items-center justify-center w-9 h-9 border rounded cursor-pointer ${
                    currentPage === index ? 'text-blue-600 border-sky-500' : 'border-gray-300'
                  }`}
                  onClick={() => changePage(index)}
                  key={index}
                >
                  {index + 1}
                </li>
              ))}
              <li
                className={`flex items-center justify-center w-9 h-9 border rounded ${
                  currentPage === totalPage - 1 ? 'bg-gray-300 cursor-not-allowed' : 'cursor-pointer'
                }`}
                onClick={nextPage}
              >
                <img
                  src="https://www.tailwindtap.com/assets/travelagency-admin/rightarrow.svg"
                  alt="Next"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      
    </div>
          <ToastContainer />
          </>
  );
};

export default TableReact;
