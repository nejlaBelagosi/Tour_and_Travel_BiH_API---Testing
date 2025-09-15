pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

//Response doesn't contain sensitive infromations
pm.test("Response does not contain sensitive infromations", function(){
    var responseText = pm.response.text();
    pm.expect(responseText).to.not.include("token");
    pm.expect(responseText).to.not.include("password");
    pm.expect(responseText).to.not.include("secret");
});

//checks if API headers are correct
pm.test("Check if API headers are correct", function () {
    const contentType = pm.response.headers.get('Content-Type');
    pm.expect(contentType, "Content-Type header is missing").to.not.be.undefined;
    pm.expect(contentType).to.satisfy(type =>
        type.includes('application/json') || type.includes('text/plain')
    );
});

