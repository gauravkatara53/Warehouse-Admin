import React, { useEffect, useState } from "react";
import apiService from "./apiService";
import { ClipLoader } from "react-spinners"; // Spinner for loading
interface Price {
  title: string;
  amount: number;
  discount: number;
  _id: string;
}

interface Location {
  type: string;
  coordinates: [number, number];
}

interface Warehouse {
  _id: string;
  name: string;
  about: string;
  price: Price[];
  location: Location;
  rentOrSell: string;
  warehouseAddress: string;
}

const ExampleComponent: React.FC = () => {
  const [data, setData] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiService
      .get<{ success: boolean; data: Warehouse[] }>("/warehouse/all-warehouses")
      .then((response) => {
        if (response && response.success) {
          setData(response.data);
        } else {
          setError("Failed to fetch data");
        }
      })
      .catch((err) => {
        setError("Error fetching data: " + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <div className="flex justify-center items-center">
          <ClipLoader
            className="mt-80"
            size={50}
            color={"#4FD1C5"}
            loading={loading}
          />{" "}
          {/* Loading Spinner */}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Warehouses</h1>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            <h2 className="bg-gray-200 text-red-800">{item.name}</h2>
            <p className="bg-gray-100 text-yellow-600">{item.about}</p>
            <p>Address: {item.warehouseAddress}</p>
            <p>
              Price:{" "}
              {item.price.map((p) => `${p.title}: ${p.amount}`).join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExampleComponent;
