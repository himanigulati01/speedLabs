import React from "react";

import Rating from "@material-ui/lab/Rating";

import Box from "@material-ui/core/Box";

function CourseListItem(props) {
  const rate = Math.floor(props.rating);

  for (let i = 1; i <= rate; i++) {
    <li>
      <span class="fas fa-star">
        <span class="sr-only">star</span>
      </span>
    </li>;
  }
  return (
    <div class="col-xs-12 col-sm-6 col-lg-4">
      {/* <!-- popular post --> */}
      <article class="popular-post">
        <div class="aligncenter">
          <img
            class="card-img"
            src={props.image_url}
            alt="description"
            style={{ height: "200px" }}
          />
        </div>
        <div>
          {props.discount === 0 ? (
            <strong class="bg-primary text-white font-lato text-uppercase price-tag">
              ₹{props.price}
            </strong>
          ) : (
            <>
              <strong
                class="bg-danger text-red font-lato text-uppercase price-tag"
                style={{ textDecoration: "line-through" }}
              >
                ₹{props.price}
              </strong>
              <strong
                class="bg-primary text-white font-lato text-uppercase price-tag"
                style={{ marginLeft: "10px" }}
              >
                ₹{props.price - (props.price * props.discount) / 100}
              </strong>
              {/* <OfflineBoltIcon />
              {props.discount}% */}
            </>
          )}
        </div>
        <h3 class="post-heading">
          <a href={`/${props.id}/description/${props.id2}`}>
            {props.product_name}
          </a>
        </h3>
        <div class="post-author">
          <h4 class="author-heading">
            <a>{props.creator_name}</a>
          </h4>
        </div>
        {props.price - (props.price * props.discount) / 100 === 0 && (
          <strong class="bg-primary text-white font-lato text-uppercase price-tag">
            Free
          </strong>
        )}
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
          </ul>

          <Box component="fieldset" borderColor="transparent">
            <Rating name="read-only" value={props.course_rating} readOnly />
          </Box>
        </footer>
      </article>
    </div>
  );
}
export default CourseListItem;
