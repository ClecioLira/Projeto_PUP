'use client'
import { useProductStore } from "@/store/cart";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const Bag = () => {
  const {
    products,
    removeProduct,
    incrementQuantity,
    decrementQuantity,
    calculateTotal,
  } = useProductStore();

  return (
    <div>
      <div>
        {products.map((product) => (
          <Card
            key={product.id}
            sx={{ maxWidth: 200 }}
            className="p-2 mt-8 mb-4"
          >
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
              style={{ height: 150, width: 200 }}
              className="rounded-md"
            />
            <CardContent>
              <Typography
                gutterBottom
                fontWeight="600"
                variant="body2"
                component="div"
              >
                <span>{product.name}</span>
              </Typography>

              <Typography gutterBottom variant="body2" component="div">
                R$ {product.price}
              </Typography>
            </CardContent>

            <div>
              <div className="flex justify-between w-full items-center px-4 -mt-4">
                <button
                  onClick={() => {
                    incrementQuantity(product.id);
                  }}
                >
                  <IoIosAddCircle size="24px" color="green" />
                </button>

                <p>{product.quantity}</p>

                <button onClick={() => decrementQuantity(product.id)}>
                  <IoIosRemoveCircle size="24px" color="red" />
                </button>
              </div>
              <Button
                variant="contained"
                color="error"
                size="medium"
                style={{ width: "100%", marginTop: "0.5rem" }}
                onClick={() => removeProduct(product.id)}
              >
                Remover
              </Button>
            </div>
          </Card>
        ))}

        <div className="text-black mt-8 mb-2">
          <p>
            Valor total: <strong>R${calculateTotal().toFixed(2)}</strong>
          </p>
        </div>

        <Button
          variant="outlined"
          color="success"
          className="w-full text-center"
        >
          Comprar
        </Button>
      </div>
    </div>
  );
};

export default Bag;
