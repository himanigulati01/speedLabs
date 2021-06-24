// import Card from "../Card";
// import React from "react";
// import "./Categories.css";
// import Carousel from "react-elastic-carousel";
// const Categories = () => {
//   const breakPoints = [
//     { width: 550, itemsToShow: 1 },
//     { width: 768, itemsToShow: 3 },
//     { width: 1200, itemsToShow: 3 },
//     { width: 1500, itemsToShow: 4 },
//   ];
//   return (
//     <div className="Container">
//       <div className="Categories-container">
//         <div className="Categories-container-header">
//           <h1>Top Categories</h1>
//         </div>
//         <div className="Categories-container-content">
//           <Carousel breakPoints={breakPoints}>
//             {[1, 2, 3, 4, 5].map((index) => (
//               <Card>
//                 <img
//                   key={index}
//                   style={{ maxHeight: "100%", maxWidth: "100%" }}
//                   src={`/images/${index}.jpg`}
//                   alt={index}
//                 />
//               </Card>
//             ))}
//           </Carousel>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Categories;
