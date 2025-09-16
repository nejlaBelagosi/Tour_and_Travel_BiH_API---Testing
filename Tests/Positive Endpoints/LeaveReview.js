pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

const jsonData = pm.response.json();

if (jsonData && jsonData.reviewId) {
    pm.environment.set("reservationId", jsonData.reviewId);
    console.log("reservationId saved:", jsonData.reviewId);
}

//check response header
pm.test("Response headers are valid", function(){
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

//check is API payload within acceptable limits
pm.test("Response Time is within acceptable limits", function(){
    pm.expect(pm.response.responseTime).to.be.below(1024);
});

//checks if API payload is within accepted limits
pm.test("Response payload is within accepted limits", function () {
    pm.expect(pm.response.text().length).to.be.below(1024);
});

//check if all required fields are created
pm.test("Fields are created", function(){
    pm.expect(jsonData).to.be.an('object');
    pm.expect(jsonData).to.have.property("postDate");
    pm.expect(jsonData).to.have.property("reviewComment");
    pm.expect(jsonData).to.have.property("reviewId");
    pm.expect(jsonData).to.have.property("userId");
    pm.expect(jsonData).to.have.property("reservationId");
});

pm.test("Rating is within valid range", function () {
    pm.expect(jsonData.rating).to.be.within(0, 5);
});

//check if all field data types are valid
pm.test("Filed data types are valid", function(){
    pm.expect(jsonData.reviewId).to.be.a("number");
    pm.expect(jsonData.userId).to.be.a("number");
    pm.expect(jsonData.reservationId).to.be.a("number");
})

// Validation of review comment
pm.test("Review comment is not empty", function () {
    pm.expect(jsonData.reviewComment).to.be.a("string").and.not.empty;
});

// date validation
pm.test("postDate is a valid date string", function () {
    const date = new Date(jsonData.postDate);
    pm.expect(date.toString()).to.not.eql("Invalid Date");
});

// Checks reservation status
pm.test("Reservation status is 'zavrseno'", function () {
    pm.expect(jsonData).to.have.property("reservation");
    pm.expect(jsonData.reservation).to.have.property("reservationStatus");
    pm.expect(jsonData.reservation.reservationStatus).to.eql("zavrseno");
});
