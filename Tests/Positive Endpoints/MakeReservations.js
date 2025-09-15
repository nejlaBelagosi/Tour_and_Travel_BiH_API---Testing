pm.test("Response is JSON", function () {
    pm.expect(pm.response.json());
});

const jsonData = pm.response.json();

if (jsonData && jsonData.reservationId) {
    pm.environment.set("reservationId", jsonData.reservationId);
    console.log("reservationId saved:", jsonData.reservationId);
}


// Status code check
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Content-Type check
pm.test("Content-Type is application/json", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

// Checks if response contains all required fields
pm.test("Response contains required fields", function(){
    pm.expect(jsonData).to.be.an('object');
    pm.expect(jsonData).to.have.property("reservationId");
    pm.expect(jsonData).to.have.property("packageId");
    pm.expect(jsonData).to.have.property("userId");
});

// Checks if reservationId is above 0
pm.test("Reservation ID is above 0", function(){
    pm.expect(jsonData.reservationId).to.be.above(0);
});

// Checks if userId matches environment userId
pm.test("Fields are valid", function(){
    pm.expect(jsonData).to.have.property("userId");
    pm.expect(jsonData.userId).to.eql(Number(pm.environment.get("endUserId")));
});

// Test packageId matches request
pm.test("packageId matches request", function () {
    const expectedPackageId = pm.request.body.raw ? JSON.parse(pm.request.body.raw).packageId : null;
    pm.expect(jsonData.packageId).to.eql(expectedPackageId);
});

// API Response time
pm.test("API payload size is within accepted limits", function(){
    pm.expect(pm.response.responseTime).to.be.below(1024);
});
