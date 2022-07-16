import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "The Hunger Games",
    description:
      "The first novel in the worldwide bestselling series by Suzanne Collins Winning means fame and fortune. Losing means certain death. The Hunger Games have begun. . . . ",
  },

  {
    id: "p2",
    price: 5,
    title: "Eleven Minutes",
    description:
      "Eleven Minutes (Portuguese: Onze Minutos) is a 2003 novel by Brazilian novelist Paulo Coelho that recounts the experiences of a young Brazilian prostitute and her journey to self-realisation through sexual experience.",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
