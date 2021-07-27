import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Loader from "../loader";
import MessageBox from "../MessageBox";
import { purchasedProducts } from "../States";
import { getToken } from "../utils";

function PurchasedProduct(params) {
  const [purchasedProduct, setPurchasedProduct] =
    useRecoilState(purchasedProducts);
  const [loading, setLoading] = useState(false);
  const [errorPurchase] = useState("");

  useEffect(() => fetchPublishedProducts(), []);

  const fetchPublishedProducts = async () => {
    try {
      if (!purchasedProduct) setLoading(true);
      const response = await fetch(
        `http://35.244.8.93:4000/api/users/product`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: getToken(),
          },
        }
      );
      const productResponse = await response.json();
      const products = await productResponse.products;
      console.log(response);
      console.log(productResponse.products);
      setPurchasedProduct(products);
      setLoading(false);
    } catch (error) {
      console.log("Marketplace" + error);
    }
  };

  return (
    <div>
      {/* heading banner */}
      {/* breadcrumb nav */}
      <nav class="breadcrumb-nav">
        <div class="container">
          {/* breadcrumb */}
          <ol class="breadcrumb">
            <li>
              <a href="course-single.html">Home</a>
            </li>
            <li class="active">PurchasedProducts</li>
          </ol>
          <div>
            <div class="container holder">
              <div class="align">
                <h1>Purchased Products</h1>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* upcoming events block */}
      {loading && <Loader></Loader>}
      {errorPurchase && (
        <MessageBox variant="danger">{errorPurchase}</MessageBox>
      )}
      {purchasedProduct && (
        <section class="upcoming-events-block container">
          {/* upcoming events list */}
          <ul class="list-unstyled upcoming-events-list">
            {purchasedProduct.map((product) => (
              <li>
                <div class="alignleft">
                  <img src={product.image_url} alt="image description" />
                </div>
                <div class="description-wrap">
                  <h3 class="list-heading">
                    <a
                      href={
                        "/" + product.id + "/description/" + product.issued_by
                      }
                    >
                      {product.product_name}
                    </a>
                  </h3>
                  <h5>
                    Price:{" "}
                    {product.discount ? (
                      <strike>₹{product.price}</strike>
                    ) : (
                      <></>
                    )}
                    &nbsp;&nbsp;₹
                    {parseFloat(
                      product.price - (product.discount * product.price) / 100
                    ).toFixed(2)}
                  </h5>
                  <h5>OverView: </h5>
                  <p>{product.short_description}</p>

                  <a
                    href={
                      "/" + product.id + "/description/" + product.issued_by
                    }
                    class="btn btn-default text-uppercase"
                  >
                    Details and Contents
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default PurchasedProduct;
