import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useRecoilState } from "recoil";
import Loader from "../loader";
import MessageBox from "../MessageBox";
import { productDetails } from "../States";
import CourseView from "./CourseView";

function NewHome(props) {
  console.log(props.match.params.id)
  const [products, setProducts] = useRecoilState(productDetails);
  const [loading, setLoading] = useState(false);
  const[prodError, setprodError] = useState("");
  
  const fetchProducts = async () => {
    try {
      if(!products)
        setLoading(true);
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
      setLoading(false);
    } catch (error) {
        setprodError(error.message)
      console.log("Marketplace" + error);
    }
  };
  useEffect(() => fetchProducts(), []);
  const data = products.map(({ ...rest }) => {
    return <CourseView key={rest.id} {...rest} id2={props.match.params.id} />;
  });
  return (
    <>
      <section class="intro-block">
        {loading && <Loader></Loader>}
        <div class="slider fade-slider">
          <div>
            {/* intro block slide */}
            <article
              class="intro-block-slide overlay bg-cover bg-banner"
              background-image="url(http://placehold.it/1920x823)"
            >
              <div class="align-wrap container">
                <div class="align">
                  <div class="anim">
                    <h1 class="intro-block-heading">
                    Practice beats talent &amp; when talent doesn’t practice
                    </h1>
                  </div>
                  <div class="anim delay1">
                    <p>
                    Online adaptive practice at student’s learning pace,
                     along with analysis and improvement plan can boost results significantly
                    </p>
                  </div>
                  <div class="anim delay2">
                    <div class="btns-wrap">
                      <a
                        href={"/course-list/"+props.match.params.id}
                        class="btn btn-warning btn-theme text-uppercase"
                      >
                        Our Courses
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div class="container">
          {/* features aside */}
          <aside class="features-aside">
            <a href="#" class="col">
              <span class="icn-wrap text-center no-shrink">
                <img
                  src="/images/icon01.svg"
                  width="44"
                  height="43"
                  alt="trophy"
                />
              </span>
              <div class="description">
                <h2 class="features-aside-heading">World'd Best Instructors</h2>
              </div>
            </a>
            <a href="#" class="col">
              <span class="icn-wrap text-center no-shrink">
                <img
                  src="/images/icon02.svg"
                  width="43"
                  height="39"
                  alt="computer"
                />
              </span>
              <div class="description">
                <h2 class="features-aside-heading">Learn Courses Onlines</h2>
              </div>
            </a>
            <a href="#" class="col">
              <span class="icn-wrap text-center no-shrink">
                <img
                  src="/images/icon03.svg"
                  width="43"
                  height="39"
                  alt="computer"
                />
              </span>
              <div class="description">
                <h2 class="features-aside-heading">
                  Online Library &amp; Store
                </h2>
              </div>
            </a>
          </aside>
        </div>
      </section>
      {/* popular posts block */}
      <section class="popular-posts-block container">
        <header class="popular-posts-head">
          <h2 class="popular-head-heading">Courses</h2>
          {prodError && <MessageBox variant="danger">{prodError}</MessageBox>}
        </header>
        <div class="row">
          {/* popular posts slider */}
          <div className="slider popular-posts-slider">
            {/* {products && products.map((product)=>( */}

                 {data}
            {/* ))} */}

            
            </div>
						</div>
      </section>
      {/* categories aside */}
      <aside class="bg-cover categories-aside text-center background_1920_365">
        <div class="container holder">
          {/* categories list */}
          <ul class="list-unstyled categories-list">
            <li>
              <a href="#">
                <div class="align">
                  <span class="icn-wrap">
                    <img
                      src="/images/icon04.svg"
                      width="43"
                      height="43"
                      alt="description"
                    />
                  </span>
                  <strong class="h h5 element-block text-uppercase">
                    Buisness
                  </strong>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="align">
                  <span class="icn-wrap">
                    <img
                      src="/images/icon05.svg"
                      width="44"
                      height="48"
                      alt="image description"
                    />
                  </span>
                  <strong class="h h5 element-block text-uppercase">
                    Language
                  </strong>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="align">
                  <span class="icn-wrap">
                    <img
                      src="/images/icon06.svg"
                      width="51"
                      height="42"
                      alt="image description"
                    />
                  </span>
                  <strong class="h h5 element-block text-uppercase">
                    Programming
                  </strong>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="align">
                  <span class="icn-wrap">
                    <img
                      src="/images/icon07.svg"
                      width="51"
                      height="42"
                      alt="image description"
                    />
                  </span>
                  <strong class="h h5 element-block text-uppercase">
                    Film &amp; Video
                  </strong>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="align">
                  <span class="icn-wrap">
                    <img
                      src="/images/icon08.svg"
                      width="51"
                      height="39"
                      alt="image description"
                    />
                  </span>
                  <strong class="h h5 element-block text-uppercase">
                    Photography
                  </strong>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="align">
                  <span class="icn-wrap">
                    <img
                      src="/images/icon09.svg"
                      width="51"
                      height="51"
                      alt="image description"
                    />
                  </span>
                  <strong class="h h5 element-block text-uppercase">
                    Web Design
                  </strong>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      {/* getstarted block */}
      <article class="container getstarted-block">
        <div class="row">
          <div class="col-xs-12 col-md-8 col">
            <div class="description-wrap">
              <h2>
                <span class="element-block">Get the coaching training</span>
                <span class="fw-light ttn element-block">
                  1000s of online courses
                </span>
              </h2>
              <p>
                German final week mother of god grey viverra no computer unlock
                impossibru. Pikachu grin venenatis cuteness&hellip;
              </p>
              <a href="#" class="btn btn-default text-uppercase">
                view details
              </a>
            </div>
          </div>
          <div class="col-xs-12 col-md-4 col text-center">
            <div class="limit-counter">
              <strong class="title element-block fw-normal">
                It's limited seating! Hurry up
              </strong>
              <div id="defaultCountdown" class="comming-timer"></div>
            </div>
          </div>
        </div>
        {/* getstarted bar */}
        <aside class="getstarted-bar bg-gray text-center">
          <strong class="h h4 element-block">
            CREATE AN ACCOUNT TO GET STARTED
          </strong>
          <a
            href="#"
            class="btn btn-theme btn-warning text-uppercase no-shrink"
          >
            Signin Now
          </a>
        </aside>
      </article>
    </>
  );
}
export default withRouter(NewHome);