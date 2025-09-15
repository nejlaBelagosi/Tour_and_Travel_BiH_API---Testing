pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

//Response time is below 1000ms
pm.test("Response time is below 1000ms", function(){
    pm.expect(pm.response.responseTime).to.be.below(1000);
})

//check API Url endpoint is valid
pm.test("API URL endpoint is valid", function(){
    pm.expect(pm.request.url.toString()).to.eql(`${pm.environment.get('baseUrl')}/api/Reservation/DeleteReservation/${pm.environment.get('reservationId')}`);
})

//check header content type
pm.test("Content-Type is application/json", function(){
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
})
