const jsonData = pm.response.json();

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

//checks if response is JSON
pm.test("Response is JSON", function () {
    pm.expect(pm.response.json());
});

isJson = true;

if (isJson) {
    //Checks if there is favorites array
    pm.test("Favorites array is present", function () {
        pm.expect(jsonData).to.be.an("array");
    });

    if (jsonData.length > 0) {
        // Each favorite item has required fields
        pm.test("Each favorite item has required fields", function () {
            jsonData.forEach(item => {
                pm.expect(item).to.have.property("favoriteItemId");
                pm.expect(item).to.have.property("packageId");
                pm.expect(item).to.have.property("userId");
            })
        });

        // data types are valid
        pm.test("Favorite item fields have correct data types", function () {
            jsonData.forEach(item => {
                pm.expect(item.favoriteItemId).to.be.a("number");
                pm.expect(item.packageId).to.be.a("number");
                pm.expect(item.userId).to.be.a("number");
                pm.expect(item.favoriteItemId).to.be.a("number");
            })
        })

        // Each favorite item belongs to the logged-in user
        pm.test("Each favorite item belongs to the logged-in user", function () {
            const loggedInUserId = parseInt(pm.environment.get("endUserId"), 10);
            jsonData.forEach(item => {
                pm.expect(item.userId).to.eql(loggedInUserId);
            });
        });

        //checks if user has favorites items

        pm.test("User has at least one favorite item", function () {
            pm.expect(jsonData.length).to.be.above(0);
        });

    } else {
        // user has no favorites items
        pm.test("User has no favorite items", function () {
            pm.expect(jsonData.length).to.eql(0);
        });
    }
}
