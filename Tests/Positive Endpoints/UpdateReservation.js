const jsonData = pm.response.json();

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

//checks if response is JSON
pm.test("Response is JSON", function () {
    pm.expect(pm.response.to.be.json);
});

//checks if API payload is within accepted limits
pm.test("Response payload is within accepted limits", function () {
    pm.expect(pm.response.text().length).to.be.below(1024);
});

//checks if API URL is correct
pm.test("API URL is correct", function () {
    pm.expect(pm.request.url.toString()).to.include(`${pm.environment.get('baseUrl')}/api/Reservation/UpdateReservation/${pm.environment.get('reservationId')}`);
});

//checks if API headers are correct
pm.test("API Headers are correct", function () {
    pm.expect(pm.request.headers.get('Content-Type')).to.eql('application/json');
});

//checks if response has expected id
pm.test("Response has expected id", function () {
    let requestData = JSON.parse(pm.request.body.raw);
    let responseData = pm.response.json();
    pm.expect(responseData.id).to.eql(requestData.id);
});

//checks if fields are edited
pm.test("Fields are edited", function () {
    let requestData = JSON.parse(pm.request.body.raw);
    pm.expect(jsonData.totalTravelers).to.eql(requestData.totalTravelers);
    pm.expect(jsonData.dateOfReservation).to.eql(requestData.dateOfReservation);
    pm.expect(jsonData.totalPrice).to.eql(requestData.totalPrice);
    pm.expect(jsonData.userId).to.eql(requestData.userId);
    pm.expect(jsonData.packageId).to.eql(requestData.packageId);
    pm.expect(jsonData.reservationStatus).to.eql(requestData.reservationStatus);

});
