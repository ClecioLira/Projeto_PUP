"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPlantById } from "@/services/Plant";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { CiSearch } from "react-icons/ci";
import CarroselInDetail from "@/components/Carrosel/CarroselInDetail";
import { useProductStore } from "@/store/cart";

interface Plant {
  id: string;
  name: string;
  image: string;
  price: string;
  newPrice: string;
  description: string;
  category: string;
}

interface Cep {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
}

export default function PlantDetail() {
  const { id } = useParams();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cep, setCep] = useState("");
  const [resultCep, setResultCep] = useState<Cep>();
  const { addProduct } = useProductStore();

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        if (typeof id === "string") {
          const plantData = await getPlantById(id);
          setPlant(plantData);
        }
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPlant();
  }, [id]);

  const handleAddProduct = (e: any) => {
    e.preventDefault();

    if (plant) {
      addProduct({ ...plant, quantity: 1 });
    }
  };

  const handleCep = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const dataCep = await res.json();
      setResultCep(dataCep);
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-green-50 h-screen">
        <Box sx={{ display: "flex" }}>
          <CircularProgress size="5rem" color="success" />
        </Box>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center bg-red-50 h-screen">
        <p className="text-red-600 font-semibold text-xl">
          Ocorreu um erro ao carregar a planta. Tente novamente mais tarde.
        </p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <section className="flex flex-col justify-center p-4 my-4 items-center lg:w-4/5 xl:w-1/2">
        <div className="flex flex-col md:flex-row justify-center md:gap-4 w-4/5">
          <div className="flex-1">
            <img
              src={`${plant?.image}`}
              alt={`${plant?.name}`}
              className="rounded-md shadow-md shadow-gray-500"
            />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-2xl mb-2">{plant?.name}</h2>

            <p>R$ {plant?.price}</p>

            <p>{plant?.description}</p>

            <div className="mt-4 flex gap-2">
              <TextField
                label="Calcule o CEP"
                type="text"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                fullWidth
                required
                color="success"
              />
              <Button
                variant="contained"
                color="success"
                onClick={(e) => handleCep(e)}
              >
                <CiSearch />
              </Button>
            </div>

            <div>
              {resultCep ? (
                <div className="text-gray-600 border rounded-md border-gray-400 p-4 mt-2">
                  <p>
                    {resultCep.estado} - {resultCep.uf}
                  </p>
                  <p>{resultCep.localidade}</p>
                  <p>{resultCep.bairro}</p>
                  <p>{resultCep.logradouro}</p>
                </div>
              ) : (
                ""
              )}
            </div>

            <Button
              variant="contained"
              color="success"
              style={{ marginTop: "1rem" }}
              fullWidth
              onClick={handleAddProduct}
            >
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>

        <div>
          <CarroselInDetail />
        </div>
      </section>
    </main>
  );
}
