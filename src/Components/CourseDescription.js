import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { addToCart } from "./Cart/CartOperations";
function CourseDescription(props) {
  //const [catId, setCatId] = useRecoilState(categoryId);
  const [productDetail, setProductDetail] = useState({});
  const [contentList, setContentList] = useState([]);
  console.log(props);
  useEffect(() => fetchProductDetail(), []);
  const fetchProductDetail = async () => {
    try {
      const response = await fetch(
        `http://35.244.8.93:4000/api/users/product/${props.match.params.id}?institute=${props.match.params.id2}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const productResponse = await response.json();
      function sortArray(objectArray, property) {
        const unordered_list = objectArray.reduce((acc, obj) => {
          const key = obj[property];
          if (!acc[key]) {
            acc[key] = [];
          }
          // Add object to list for given key's value
          acc[key].push(obj);
          return acc;
        }, {});
        console.log(Object.entries(unordered_list).sort((a, b) => a[1] - b[1]));
        //setcontentList(Object.entries(unordered_list).sort((a,b) => a[1]-b[1]))
        //setready(true);
        return Object.entries(unordered_list).sort((a, b) => a[1] - b[1]);
      }
      console.log(sortArray(productResponse.details.content, "section_name"));
      setContentList(
        sortArray(productResponse.details.content, "section_name")
      );
      //setContentList(productResponse.details.content, productResponse.details.id);
      setProductDetail(productResponse.details);
      console.log(productResponse.details);
    } catch (error) {
      console.log("productDesc.js" + error);
    }
  };
  console.log(contentList);
  console.log(productDetail);
  return (
    <>
      {/* heading banner */}
      {/* breadcrumb nav */}
      <nav class="breadcrumb-nav">
        <div class="container">
          {/* breadcrumb */}
          <ol class="breadcrumb">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="contact.html">Course</a>
            </li>
            <li class="active"> {productDetail.product_name}</li>
          </ol>
        </div>
      </nav>
      {/* two columns */}
      <div id="two-columns" class="container">
        <div class="row">
          {/* content */}
          <article id="content" class="col-xs-12 col-md-9">
            {/* content h1 */}
            <h1 class="content-h1 fw-semi"> {productDetail.product_name}</h1>
            {/* view header */}
            <header class="view-header row">
              <div class="col-xs-12 col-sm-9 d-flex">
                <div class="d-col">
                  {/* post author */}
                  <div class="post-author">
                    <div class="description-wrap">
                      <h2 class="author-heading">
                        <a href="#">Instructor</a>
                      </h2>
                      <h3 class="author-heading-subtitle text-uppercase">
                        {productDetail.creator_name}
                      </h3>
                    </div>
                  </div>
                </div>
                <div class="d-col">
                  {/* post author */}
                  <div class="post-author">
                    <div class="alignleft no-shrink icn-wrap">
                      <i class="far fa-bookmark"></i>
                    </div>
                    <div class="description-wrap">
                      <h2 class="author-heading">
                        <a href="#">Category</a>
                      </h2>
                      <h3 class="author-heading-subtitle text-uppercase">
                        {productDetail.category_name}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-3">
                <div class="rating-holder">
                  <ul class="star-rating list-unstyled justify-end">
                    <li>
                      <span class="fas fa-star">
                        <span class="sr-only">star</span>
                      </span>
                    </li>
                    <li>
                      <span class="fas fa-star">
                        <span class="sr-only">star</span>
                      </span>
                    </li>
                    <li>
                      <span class="fas fa-star">
                        <span class="sr-only">star</span>
                      </span>
                    </li>
                    <li>
                      <span class="fas fa-star">
                        <span class="sr-only">star</span>
                      </span>
                    </li>
                    <li>
                      <span class="fas fa-star">
                        <span class="sr-only">star</span>
                      </span>
                    </li>
                  </ul>
                  <strong class="element-block text-right subtitle fw-normal">
                    (2 Reviews)
                  </strong>
                </div>
              </div>
            </header>
            <div class="aligncenter content-aligncenter">
              <img src={productDetail.image_url} alt="description" />
            </div>
            <h3 class="content-h3">Course Description</h3>
            <p>{productDetail.description}</p>
            <h3 class="content-h3">What you will learn</h3>
            <p>{productDetail.you_will_learn}</p>
            {contentList.length !== 0 && <h2>Carriculam</h2>}
            {/* sectionRow */}
            {contentList?.map((content) => (
              <section class="sectionRow">
                <h2 class="h6 text-uppercase fw-semi rowHeading">
                  Section {content[0]}
                </h2>
                {/* sectionRowPanelGroup */}
                {content[1].map((cont) => (
                  <div
                    class="panel-group sectionRowPanelGroup"
                    id="accordion"
                    role="tablist"
                    aria-multiselectable="true"
                    style={{ marginBottom: 0 }}
                  >
                    {/* panel */}
                    <div class="panel panel-default">
                      <div class="panel-heading" role="tab" id="headingOne">
                        <h3 class="panel-title fw-normal">
                          <span
                            class="accOpener"
                            //role="button"
                            // data-toggle="collapse"
                            // data-parent="#accordion"
                            //aria-expanded="false"
                            //aria-controls="collapseOne"
                          >
                            <span class="accOpenerCol">
                              <i class="fas fa-play-circle inlineIcn"></i>{" "}
                              <span
                              // style={
                              //   cont.is_paid === 1 && {
                              //     pointerEvents: "none",
                              //   }
                              // }
                              >
                                {" "}
                                <a
                                  href={cont.resource_url}
                                  disable
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {cont.resource_name}{" "}
                                </a>
                              </span>
                              <span class="label label-primary text-white text-uppercase">
                                {cont.resource_type}
                              </span>
                              {cont.is_paid === 0 && (
                                <span class="label label-primary text-white text-uppercase">
                                  Free
                                </span>
                              )}
                              {cont.is_paid === 1 && (
                                <span class="label label-primary text-white text-uppercase">
                                  Paid
                                </span>
                              )}
                            </span>
                          </span>
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            ))}
            {/* bookmarkFoot */}
            <div class="bookmarkFoot">
              <div class="bookmarkCol">
                <ul class="socail-networks list-unstyled">
                  <li>
                    <a href="#" class="facebook">
                      <span class="fab fa-facebook-f"></span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="twitter">
                      <span class="fab fa-twitter"></span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="google">
                      <span class="fab fa-google-plus-g"></span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span class="fas fa-plus"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </article>
          {/* sidebar */}
          <aside class="col-xs-12 col-md-3" id="sidebar">
            {/* widget course select */}
            <section class="widget widget_box widget_course_select">
              <header class="widgetHead text-center bg-theme">
                <h3 class="text-uppercase">Take This Course</h3>
              </header>
              <strong class="price element-block font-lato" data-label="price:">
                Rs.{productDetail.price}
              </strong>
              <ul class="list-unstyled font-lato">
                <li>
                  <i class="far fa-user icn no-shrink"></i>{" "}
                  {productDetail.tot_students} Students
                </li>
                <li>
                  <i class="far fa-clock icn no-shrink"></i> Duration: 30 days
                </li>
                <li>
                  <i class="fas fa-bullhorn icn no-shrink"></i> Lectures: 10
                </li>
                <li>
                  <i class="far fa-play-circle icn no-shrink"></i> Video: 12
                  hours
                </li>
                <li>
                  <i class="far fa-address-card icn no-shrink"></i> Certificate
                  of Completion
                </li>
              </ul>
              <div class="bookmarkCol text-right">
                <a
                  onClick={()=>addToCart(productDetail.id)}
                  class="btn btn-theme btn-warning add-cart-btn text-uppercase fw-bold"
                >
                  Add to Cart
                </a>
              </div>
              
            </section>
            
            {/* widget categories */}
            {/* widget intro */}
            {/* widget popular posts */}
          </aside>
        </div>
      </div>
    </>
  );
}
export default withRouter(CourseDescription);