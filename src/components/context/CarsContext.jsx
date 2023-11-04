import { createContext, useContext,useState,useEffect  } from "react";
import axios from 'axios'
import { BACKEND_BASE_URL } from "../../utils/Config";
import {toast,Toaster} from "react-hot-toast";

const CarsContext = createContext()

export function useCarsContext(){
    return useContext(CarsContext)
}
export function CarsProvider({children}){
    
    const [cars, setCars] = useState([]);
    const[search,setSearch] = useState()

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            BACKEND_BASE_URL + '/admin/listcar/',
            {
              params: {
                search: search,
              },
            }
          );
          if (response.status === 200) {
            const data = response.data;
            setCars(data);
          } else {
            console.error('Failed to fetch car data.');
          }
        } catch (error) {
          console.log('Error fetching car data:', error);
        }
      };
  
      fetchData();
    }, [search]);

    

  const deleteCar = async (carId) => {
    try {
      const response = await axios.delete(
        `${BACKEND_BASE_URL}/admin/listcar/${carId}/`
      );

      if (response.status === 204) {
        setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
        toast.success("Car deleted successfully");
      } else {
        toast.error("Failed to delete car.");
      }
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return(
    <div>
      <Toaster/>
        <CarsContext.Provider value={{cars , deleteCar }}>
            {children}
        </CarsContext.Provider>
    </div>
  )
}
export default CarsContext;