import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { productDetails } from "../States";
import CourselistItem from "./Course-list-item";
import NotFound from "./404";
import { withRouter } from "react-router-dom";
function Courselist(props) {
  const [products, setProducts] = useRecoilState(productDetails);
  const [catId, setCatId] = useState(null);
  const [catDetails, setCatDetails] = useState([]);
  const [search, setSearch] = useState("");
  console.log(props);
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `http://35.244.8.93:4000/api/users/category/allcategories?institute=${props.match.params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const categoriesDetails = await response.json();
      console.log(response);
      console.log(categoriesDetails);
      setCatDetails(categoriesDetails);
    } catch (error) {
      console.log("CATEGORIES.JS  " + error);
    }
  };
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://35.244.8.93:4000/api/users/product/marketplace?institute=${props.match.params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const productResponse = await response.json();
      console.log(response);
      console.log(productResponse.products);
      setProducts(productResponse.products);
    } catch (error) {
      console.log("Marketplace" + error);
    }
  };
  //   const fetchCategories = async () => {
  //     console.log(id);
  //     try {
  //       const response = await fetch(
  //         `http://35.244.8.93:4000/api/users/category/allcategories?institute=10`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       const categoriesDetails = await response.json();
  //       console.log(response);
  //       console.log(categoriesDetails);
  //       setCatDetails(categoriesDetails);
  //     } catch (error) {
  //       console.log("CATEGORIES.JS  " + error);
  //     }
  //   };
  useEffect(() => fetchProducts(), []);
  const data =
    products.length === 0 ? (
      <NotFound />
    ) : (
      products
        .filter((val) => {
          if (search === null) {
            return val;
          } else if (
            val.product_name.toLowerCase().includes(search.toLowerCase())
          )
            return val;
        })
        .filter((val) => {
          if (catId === null) {
            return val;
          } else if (val.category === catId) return val;
        })
        .map(({ ...rest }) => {
          return <CourselistItem key={rest.id} {...rest} id2={props.match.params.id}/>;
        })
    );
  return (
    <>
      <header
        class="heading-banner text-white bgCover"
        background-image="url(http://placehold.it/1920x181);"
      >
        <div class="container holder">
          <div class="align">
            <h1>Courses</h1>
          </div>
        </div>
      </header>
      <nav class="breadcrumb-nav">
        <div class="container">
          <ol class="breadcrumb">
            <li>
              <a href="home.html">Home</a>
            </li>
            <li class="active">Courses</li>
          </ol>
        </div>
      </nav>
      <div id="two-columns" class="container">
        <div class="row">
          <article id="content" class="col-xs-12 col-md-9">
            <div class="row flex-wrap">{data}</div>
            <nav aria-label="Page navigation">
              {/* <!-- pagination --> */}
              <ul class="pagination">
                <li class="active">
                  <a href="#">
                    1 <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#" aria-label="Next">
                    <span aria-hidden="true">&rsaquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </article>
          {/* <!-- sidebar --> */}
          <aside class="col-xs-12 col-md-3" id="sidebar">
            {/* <!-- widget search --> */}
            <section class="widget widget_search">
              <h3>Course Search</h3>
              {/* <!-- search form --> */}
              <form action="#" class="search-form">
                <fieldset>
                  <input
                    placeholder=" Search&hellip;"
                    class="form-control"
                    value={search}
                    type="search"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button type="button" class="fas fa-search">
                    <span class="sr-only">search</span>
                  </button>
                </fieldset>
              </form>
            </section>
            {/* <!-- widget categories --> */}
            <section class="widget widget_categories">
              <h3>Course Categories</h3>
              <ul class="list-unstyled text-capitalize font-lato">
                <li class="cat-item cat-item-1">
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => setCatId(null)}
                  >
                    All
                  </span>
                </li>
                {catDetails?.map((cate) => (
                  <li class="cat-item cat-item-1">
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => setCatId(cate.id)}
                    >
                      {cate.name}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}
export default withRouter(Courselist);