pm.test("Status code is 200", function () {
    pm.response.to.be.oneOf([200,204]);
});

//is JSON Valid
pm.test("Response is valid JSON", function(){
    pm.expect(pm.response.json());
});

//check response headers
pm.test("Response headers are valid", function(){
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

//check request url
pm.test("Request Url is valid", function(){
    pm.expect(pm.request.url.toString()).to.eql(`${pm.environment.get('baseUrl')}/api/Review/GetReviewByPackageId/GetReviewByPackageId/${pm.environment.get('tourPackageId')}`);
});

//check API response time is within acceptable limits
pm.test("API response time is within acceptable limits", function(){
    pm.expect(pm.response.responseTime).to.be.below(500);
});

