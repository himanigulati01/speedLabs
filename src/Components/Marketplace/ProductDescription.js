import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Loading from "../Loading";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { FcBusinessman } from "react-icons/fc";
import Chip from "@material-ui/core/Chip";
import Rating from "@material-ui/lab/Rating";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";
import { HiUsers } from "react-icons/hi";
import { MdDescription } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import { FcSurvey } from "react-icons/fc";
import { GrDocumentPdf } from "react-icons/gr";
import { FaRegPlayCircle } from "react-icons/fa";
import { VscPreview } from "react-icons/vsc";

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: "50px",
  },
});

const ProductDescription = (props) => {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const classes = useStyles();
  const [productDetail, setProductDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let id = props.match.params.id;
  let id2 = props.match.params.id2;
  console.log(id);
  useEffect(() => fetchProductDetail(), []);
  const fetchProductDetail = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://35.244.8.93:4000/api/users/product/${id}?institute=${id2}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const productResponse = await response.json();
      setProductDetail(productResponse.details);
      console.log(productResponse.details);
      setIsLoading(false);
    } catch (error) {
      console.log("productDesc.js" + error);
      setIsLoading(false);
    }
  };

  const leftPreview = (
    <Card variant="outlined" style={{ width: "65vw" }}>
      <CardContent>
        {/*Product Name*/}
        <Typography
          className={classes.title}
          variant="h4"
          gutterBottom
          style={{ fontVariant: "all-small-caps" }}
        >
          {productDetail.product_name}
        </Typography>
        <hr />

        {/*Description*/}
        <Typography
          variant="h5"
          gutterBottom
          style={{ marginTop: "20px", fontVariantCaps: "all-petite-caps" }}
        >
          Description
        </Typography>
        <Typography
          className={classes.pos}
          color="textSecondary"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          <MdDescription /> {productDetail.description}
        </Typography>

        <hr />
        {/*what you will learn*/}
        <Typography
          variant="h5"
          gutterBottom
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            fontVariantCaps: "all-petite-caps",
          }}
        >
          What You Will Learn
        </Typography>
        <Typography
          className={classes.pos}
          color="textSecondary"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          <span>
            <FcApproval />
          </span>{" "}
          {productDetail.you_will_learn}
        </Typography>

        {/*pre-requisites*/}
        <Typography variant="h6" style={{ fontVariantCaps: "all-petite-caps" }}>
          Pre-requisites
        </Typography>
        <Typography
          className={classes.pos}
          color="textSecondary"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          <span>
            <FcSurvey />
          </span>{" "}
          {productDetail.pre_requisites}
        </Typography>
        <hr />
        {/*Content*/}
        <Typography
          className={classes.title}
          variant="h5"
          gutterBottom
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            fontVariantCaps: "all-petite-caps",
          }}
        >
          content
        </Typography>

        <div>
          {productDetail === undefined ? (
            <Loading />
          ) : (
            productDetail.content?.map((cont, index) => (
              <div>
                <Accordion
                  square
                  expanded={expanded === `panel${index + 1}`}
                  onChange={handleChange(`panel${index + 1}`)}
                >
                  <AccordionSummary
                    aria-controls={`panel${index + 1}d-content`}
                    id={`panel${index + 1}d-header`}
                  >
                    <Typography>
                      <span>
                        <VscPreview />
                      </span>{" "}
                      {cont.section_name}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {cont.resource_type === "pdf" && <GrDocumentPdf />}
                      {cont.resource_type === "video" && <FaRegPlayCircle />}

                      <Button
                        href={cont.resource_url}
                        disabled={cont.is_paid === 1}
                        color="primary"
                      >
                        {"   "}
                        {cont.resource_name}
                        {"  "}
                      </Button>

                      {cont.is_paid === 0 && (
                        <Chip color="primary" size="small" label="Free" />
                      )}
                      {cont.is_paid === 1 && (
                        <Chip color="secondary" size="small" label="Paid" />
                      )}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))
          )}
        </div>

        <hr />
        {/*Reviews*/}
        <Typography
          className={classes.title}
          variant="h5"
          gutterBottom
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            fontVariantCaps: "all-petite-caps",
          }}
        >
          Reviews
        </Typography>
        <Typography
          className={classes.pos}
          color="textSecondary"
          style={{ marginTop: "20px" }}
        >
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </Typography>
      </CardContent>
    </Card>
  );

  const rightPreview = (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="250"
          image={productDetail.image_url}
          title={productDetail.image_name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h3">
            {productDetail.set_currency} {productDetail.price}
          </Typography>
          <hr />
          <Typography
            variant="subtitle2"
            component="p"
            style={{ lineHeight: "2.45" }}
          >
            Basic Info
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ lineHeight: "2.45" }}
          >
            Type :{" "}
            <Chip
              color="primary"
              size="small"
              label={productDetail.product_type}
            />
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ lineHeight: "2.45" }}
          >
            <HiUsers /> User : {productDetail.tot_students}
          </Typography>

          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ lineHeight: "2.45" }}
          >
            <span>
              <FcBusinessman />
            </span>{" "}
            Creator : <strong>{productDetail.creator_name}</strong>
          </Typography>
          <hr />

          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ lineHeight: "2.45" }}
          >
            User Rating:
          </Typography>

          <Rating
            name="customized-icons"
            defaultValue={productDetail.course_rating}
            getLabelText={(value) => customIcons[value].label}
            IconContainerComponent={IconContainer}
            readOnly
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );

  return (
    <>
      {isLoading || productDetail === undefined ? (
        <Loading />
      ) : (
        <div
          style={{
            display: "flex",
            backgroundColor: "#f7efff",
          }}
        >
          <div style={{ margin: " 61px 0px 0 4rem" }}>{leftPreview}</div>

          <div style={{ margin: "15px 0 0 23px" }}>{rightPreview}</div>
        </div>
      )}
    </>
  );
};

export default withRouter(ProductDescription);
