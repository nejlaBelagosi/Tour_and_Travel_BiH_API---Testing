
const jsonData = pm.response.text();

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// API response time is within acceptable limits
pm.test("API response time is within acceptable limits", function(){
    pm.expect(pm.response.responseTime).to.be.below(1024);
});

//checks if API payload is within accepted limits
pm.test("Response payload is within accepted limits", function () {
    pm.expect(pm.response.text().length).to.be.below(1024);
});

//check request URL
pm.test("Check request URL", function(){
    pm.expect(pm.request.url.toString()).to.include(`${pm.environment.get('baseUrl')}/api/Review/UpdateReview/${pm.environment.get('reviewId')}`);
})

const requestData = JSON.parse(pm.request.body.raw);

//checks if response has expected id
pm.test("Response has expected id", function () {
    pm.expect(jsonData.id).to.eql(requestData.id);
});

const contentType = pm.response.headers.get("Content-Type") || "";
if (contentType.includes("application/json")) {
    const jsonData = pm.response.json();
    const requestData = JSON.parse(pm.request.body.raw);

    pm.test("Fields are edited", function () {
        pm.expect(jsonData.reviewId).to.eql(requestData.reviewId);
        pm.expect(jsonData.postDate).to.eql(requestData.postDate);
        pm.expect(jsonData.reviewComment).to.eql(requestData.reviewComment);
        pm.expect(jsonData.userId).to.eql(requestData.userId);
        pm.expect(jsonData.reservationId).to.eql(requestData.reservationId);
    });
} else {
    pm.test("Response is 'Review edited'", function () {
        pm.expect(pm.response.text()).to.eql("Review edited");
    });
}
