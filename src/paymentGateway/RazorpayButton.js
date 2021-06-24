import React from "react";
function RazorpayButton(props) {
 

  // console.log(props.clientID);
  var options = {
    key: "rzp_test_foKEivKbPBbsC3", // Enter the Key ID generated from the Dashboard
    amount: props.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "AtranZ Shopping",
    description: "Online Payment",
     "order_id": props.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: function (response) {
      alert("Payment Succesful");
      props.onSuccess(response.razorpay_payment_id,response.razorpay_signature);
      // alert(response.razorpay_order_id);
      alert(response.razorpay_signature)
    },
    // prefill: {
    //   name: String(props.user.name),
    //   email: String(props.user.email),
    //   contact: String(props.user.mobile),
    // },
    theme: {
      color: "#3399CC",
    },
  };
  var rzp1 = new window.Razorpay(options);
  rzp1.on("payment.failed", function (response) {
    alert("Payement Failed");
    // alert(response.error.code);
    alert(response.error.description);
    // alert(response.error.source);
    // alert(response.error.step);
    // alert(response.error.reason);
    // alert(response.error.metadata.order_id);
    // alert(response.error.metadata.payment_id);
  });
  const payOrderHandler = (e) => {
    rzp1.open();
    e.preventDefault();
  };
  return (
    <button
      id="rzp-button1"
      className="button primary full-width"
      onClick={payOrderHandler}
    >
      Proceed to Payment
    </button>
  );
}
export default RazorpayButton;
