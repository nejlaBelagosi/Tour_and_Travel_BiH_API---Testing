const responseStatus = pm.response.code;

pm.test("Status code is 404 or 200", function () {
    pm.expect(pm.response.code).to.be.oneOf([404, 200]);
});

if (responseStatus === 200) {
    const jsonData = pm.response.json();

    // Response must be an array
    pm.test("Response is JSON (array)", function () {
        pm.expect(jsonData).to.be.an('array');
    });

    if (jsonData.length > 0) {
        // Each reservation has required fields
        pm.test("Each reservation has required fields", function () {
            jsonData.forEach(item => {
                pm.expect(item).to.have.property("reservationId");
                pm.expect(item).to.have.property("packageId");
                pm.expect(item).to.have.property("userId");
                pm.expect(item).to.have.property("totalTravelers");
                pm.expect(item).to.have.property("totalPrice");
                pm.expect(item).to.have.property("reservationStatus");
            });
        });

        // data types are valid
        pm.test("Reservation fields have correct data types", function () {
            jsonData.forEach(item => {
                pm.expect(item.reservationId).to.be.a("number");
                pm.expect(item.packageId).to.be.a("number");
                pm.expect(item.userId).to.be.a("number");
                pm.expect(item.totalTravelers).to.be.a("number");
                pm.expect(item.totalPrice).to.be.a("number");
                pm.expect(item.reservationStatus).to.be.a("string"); 
            });
        });

        // Each reservation belongs to the logged-in user
        pm.test("Each reservation belongs to the logged-in user", function () {
            const loggedInUserId = parseInt(pm.environment.get("endUserId"), 10);
            jsonData.forEach(item => {
                pm.expect(item.userId).to.eql(loggedInUserId);
            });
        });

        //checks if user has reservations
        pm.test("User has at least one reservation", function () {
            pm.expect(jsonData.length).to.be.above(0);
        });

    } else {
        // user has no reservations
        pm.test("User has no reservations", function () {
            pm.expect(jsonData.length).to.eql(0);
        });
    }
} else {
    // Handle non-JSON responses gracefully
    pm.test("Response is not JSON when reservations are not found", function () {
        pm.expect(pm.response.text()).to.eql("No reservations found for this user.");
    });
}
