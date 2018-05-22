export let state = {
  selectedFlight : null,
  seatsArray: null,
  forPaymentData :  null,
  paymentData : null,
  numberOfSeats: null,
  bookingId: null,
  userId : localStorage.getItem("Ar_id"),
  lname : localStorage.getItem("Ar_lname"),
  fname : localStorage.getItem("Ar_fname")
}
