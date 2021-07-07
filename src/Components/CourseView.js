import React from "react";
function CourseView(props) {
  return (
    <div>
      <div className="col-xs-12 col-lg-12 col-md-12">
        {/* popular post */}
        <article class="popular-post">
          <div class="aligncenter">
            <img src={props.image_url} alt="desc" />
          </div>
          <div>
            <strong class="bg-primary text-white font-lato text-uppercase price-tag">
              {props.price}
            </strong>
          </div>
          <h3 class="post-heading">
          <a href={`/${props.id}/description/${props.id2}`}>{props.product_name}</a>
          </h3>
          <div class="post-author">
            <h4 class="author-heading">
              <a href="instructor-single.html">{props.creator_name}</a>
            </h4>
          </div>
          <footer class="post-foot gutter-reset">
            <ul class="list-unstyled post-statuses-list">
              <li>
                <a href="#">
                  <span class="fas icn fa-users no-shrink">
                    <span class="sr-only">users</span>
                  </span>
                  <strong class="text fw-normal">{props.tot_students}</strong>
                </a>
              </li>
              {/* <li>
                <a href="#">
                  <span class="fas icn no-shrink fa-comments">
                    <span class="sr-only">comments</span>
                  </span>
                  <strong class="text fw-normal">10</strong>
                </a>
              </li> */}
            </ul>
            <ul class="star-rating list-unstyled">
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
          </footer>
        </article>
      </div>
    </div>
  );
}
export default CourseView;