import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import { MdDescription } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { BsCheckAll } from "react-icons/bs";
import ReactPlayer from "react-player";

import Loader from "../loader";
import MessageBox from "../MessageBox";
import { getToken } from "../utils";

import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import { Button, Link } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
// import { addToCart } from "./Cart/CartOperations";

function CourseDescription(props) {
  const [desc, setDesc] = useState("");
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const [productDetail, setProductDetail] = useState({});
  const [contentList, setContentList] = useState([]);
  const [addCartError, setaddCartError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [contentModal, setContentModal] = useState({});

  const handleOpen = (url, name) => {
    setOpen(true);
    setContentModal({ url: url, name: name });
  };

  const handleClose = () => {
    setOpen(false);
    setContentModal({});
  };

  //console.log(props);
  useEffect(() => {
    if (getToken()) {
      console.log("with Auth");
      fetchProductDetailAuth();
    } else {
      console.log("without Auth");
      fetchProductDetail();
    }
  }, []);

  //Fetching product detail if the product is purchased (in this way we get the resourse url of content)
  const fetchProductDetailAuth = async () => {
    console.log(props.match.params.id);
    try {
      if (!productDetail) setLoading(true);
      const response = await fetch(
        `http://35.244.8.93:4000/api/users/product/resource/${props.match.params.id}?institute=${props.match.params.id2}`,
        {
          method: "GET",
          headers: {
            Authorization: getToken(),
            "Content-Type": "application/json",
          },
        }
      );

      const productResponse = await response.json();
      console.log(productResponse);
      if (productResponse.flag === 1) {
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
          // console.log(
          //   Object.entries(unordered_list).sort((a, b) => a[1] - b[1])
          // );
          //setcontentList(Object.entries(unordered_list).sort((a,b) => a[1]-b[1]))
          //setready(true);
          return Object.entries(unordered_list).sort((a, b) => a[1] - b[1]);
        }
        console.log(sortArray(productResponse.details.content, "section_name"));
        setContentList(
          sortArray(productResponse.details.content, "section_name")
        );
        setProductDetail(productResponse.details);
        setDesc(productResponse.details.description);
        setLoading(false);
        console.log(productResponse.details);
      } else fetchProductDetail();
    } catch (error) {
      setFetchError(error.message);
      console.log("productDesc.js" + error);
    }
  };

  //fetching product is user is not logged in
  const fetchProductDetail = async () => {
    try {
      if (!productDetail) setLoading(true);
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
      console.log(productResponse);
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
      setLoading(false);
      console.log(productResponse.details);
    } catch (error) {
      setFetchError(error.message);
      console.log("productDesc.js" + error);
    }
  };

  console.log(productDetail);
  console.log(contentList);

  const addToCart = async (productId) => {
    try {
      setLoading(true);
      const item = { product_id: productId };
      const response = await fetch(
        "http://35.244.8.93:4000/api/users/cart/addtocart",
        {
          method: "POST",
          body: JSON.stringify(item),
          headers: {
            "Content-Type": "application/json",
            Authorization: getToken(),
          },
        }
      );
      const addToCartResponse = await response.json();
      setLoading(false);
      if (addToCartResponse.flag === 1) props.history.push("/cart");
      else setaddCartError(addToCartResponse.msg);
      console.log(addToCartResponse);
    } catch (error) {
      console.log("AddtoCart " + error);
    }
  };

  return (
    <>
      <nav class="breadcrumb-nav">
        <div class="container">
          {/* breadcrumb */}
          <ol class="breadcrumb">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">Course</a>
            </li>
            <li class="active"> {productDetail.product_name}</li>
          </ol>
        </div>
      </nav>
      {/* two columns */}
      <div id="two-columns" class="container">
        {loading && <Loader></Loader>}
        {fetchError && <MessageBox variant="danger">{fetchError}</MessageBox>}
        {addCartError && (
          <MessageBox variant="danger">{addCartError}</MessageBox>
        )}
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
                        <span>Instructor</span>
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
                        <span>Category</span>
                      </h2>
                      <h3 class="author-heading-subtitle text-uppercase">
                        {productDetail.category_name}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <div class="aligncenter content-aligncenter">
              <img src={productDetail.image_url} alt="description" />
            </div>
            <div style={{ display: "flex" }}>
              <div
                class="card  bg-info"
                style={{
                  maxWidth: "44rem",
                  padding: "10px 10px 10px 10px",
                  margin: "0px 6px 0px 0px",
                  borderRadius: "10px",
                }}
              >
                {/* <div class="card-header">Course Description</div> */}
                <div class="card-body">
                  <h5 class="card-title">
                    Course Description <MdDescription />
                  </h5>
                  <p class="card-text">
                    {isReadMore ? desc.slice(0, 400) : desc}
                    <span onClick={toggleReadMore} className="read-or-hide">
                      {isReadMore ? (
                        <span style={{ cursor: "pointer", color: "black" }}>
                          {" "}
                          ...read more
                        </span>
                      ) : (
                        <span style={{ cursor: "pointer", color: "black" }}>
                          {" "}
                          ...show Less
                        </span>
                      )}
                    </span>
                  </p>
                </div>
              </div>
              <div
                class="card text-white bg-success mb-3"
                style={{
                  maxWidth: "44rem",
                  padding: "10px 10px 10px 10px",
                  borderRadius: "10px",
                }}
              >
                <div class="card-body">
                  <h5 class="card-title">
                    What you will learn {""}
                    <BsCheckAll />
                  </h5>
                  <p class="card-text">{productDetail.you_will_learn}</p>
                  <h5 class="card-title">
                    This Includes {""}
                    <BsCheckAll />
                  </h5>
                  <p class="card-text">{productDetail.this_includes}</p>
                  <h5 class="card-title">
                    Pre-Requisites {""}
                    <BsCheckAll />
                  </h5>
                  <p class="card-text">{productDetail.pre_requisites}</p>
                </div>
              </div>
            </div>

            {/* Modal for video player */}
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <h2 id="transition-modal-title">{contentModal.name}</h2>
                  <p id="transition-modal-description">
                    <ReactPlayer url={contentModal.url} controls />
                  </p>
                  <button type="button" onClick={handleClose}>
                    Close
                  </button>
                </div>
              </Fade>
            </Modal>

            {contentList.length !== 0 && (
              <>
                {" "}
                <h2>
                  Course Content{" "}
                  <Link>
                    <FaInfoCircle />{" "}
                  </Link>
                </h2>
              </>
            )}
            {/* sectionRow */}
            {contentList?.map((content) => (
              <section class="sectionRow">
                <h2 class="h6 text-uppercase fw-semi rowHeading">
                  Section: {content[0]}
                </h2>
                {/* sectionRowPanelGroup */}
                {content[1].map((cont) => (
                  <>
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
                              // role="button"
                              // data-toggle="collapse"
                              // data-parent="#accordion"
                              // aria-expanded="false"
                              // aria-controls="collapseOne"
                            >
                              <span class="accOpenerCol">
                                {cont.resource_type === "pdf" ? (
                                  <i class="fas fa-file-pdf inlineIcn"></i>
                                ) : (
                                  <i class="fas fa-play-circle inlineIcn"></i>
                                )}

                                <span
                                // style={
                                //   cont.is_paid === 1 && {
                                //     pointerEvents: "none",
                                //   }
                                // }
                                >
                                  {/* for resource button to be dynamic according to the situation */}{" "}
                                  {cont.resource_type === "pdf" && (
                                    <Button
                                      href={cont.resource_url}
                                      disabled={cont.resource_url === ""}
                                      color="primary"
                                    >
                                      {"   "}
                                      {cont.resource_name}
                                      {"  "}
                                    </Button>
                                  )}
                                  {cont.resource_type === "youtube" && (
                                    <Button
                                      disabled={cont.resource_url === ""}
                                      color="primary"
                                      onClick={() =>
                                        cont.resource_url ? (
                                          handleOpen(
                                            cont.resource_url,
                                            cont.resource_name
                                          )
                                        ) : (
                                          <Modal></Modal>
                                        )
                                      }
                                    >
                                      {"   "}
                                      {cont.resource_name}
                                      {"  "}
                                    </Button>
                                  )}
                                  {cont.resource_type === "video" && (
                                    <Button
                                      //href={cont.resource_url}
                                      disabled={cont.resource_url === ""}
                                      color="primary"
                                      onClick={() =>
                                        handleOpen(
                                          cont.resource_url,
                                          cont.resource_name
                                        )
                                      }
                                    >
                                      {"   "}
                                      {cont.resource_name}
                                      {"  "}
                                    </Button>
                                  )}
                                </span>
                                <span class="label label-primary text-white text-uppercase">
                                  {cont.resource_type}
                                </span>
                                {cont.is_paid === 0 && (
                                  <span class="label bg-success text-white text-uppercase">
                                    Free
                                  </span>
                                )}
                                {cont.is_paid === 1 && (
                                  <span class="label label-danger text-white text-uppercase">
                                    Paid
                                  </span>
                                )}
                              </span>
                            </span>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </section>
            ))}
            {/* bookmarkFoot */}
            <div class="bookmarkFoot">
              <div class="bookmarkCol">
                <ul class="socail-networks list-unstyled">
                  <li>
                    <a
                      href="https://www.facebook.com/SpeEdLabsindia/"
                      class="facebook"
                    >
                      <span class="fab fa-facebook-f"></span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/speedlabs_india?lang=en"
                      class="twitter"
                    >
                      <span class="fab fa-twitter"></span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://practice.speedlabs.in/Login.aspx?rsn=ssnexp"
                      class="google"
                    >
                      <span class="fab fa-google-plus-g"></span>
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
                ₹
                {productDetail.price -
                  (productDetail.price * productDetail.discount) / 100}
              </strong>
              <ul class="list-unstyled font-lato">
                <li>
                  <i class="far fa-user icn no-shrink"></i>{" "}
                  {productDetail.tot_students} Students
                </li>

                <li>
                  <i class="far fa-address-card icn no-shrink"></i> Certificate
                  of Completion
                </li>
              </ul>
              <div class="bookmarkCol text-right">
                <span
                  onClick={() => addToCart(productDetail.id)}
                  class="btn btn-theme btn-warning add-cart-btn text-uppercase fw-bold"
                >
                  Add to Cart
                </span>
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
