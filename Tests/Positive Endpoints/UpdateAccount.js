// Status code
pm.test("Status code is 200 or 400", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 400]);
});

// User update validation
pm.test("User updated successfully", () => {
    if (pm.response.headers.get('Content-Type')?.includes('application/json')) {
        const res = pm.response.json();
        const requestData = JSON.parse(pm.request.body.raw);

        pm.expect(res.username).to.eql(requestData.username);
        pm.expect(res.userPassword).to.eql(requestData.userPassword);
        pm.expect(res.userImage).to.eql(requestData.userImage);
        pm.expect(res.accountTypeId).to.eql(requestData.accountTypeId);
    } else {
        pm.expect(pm.response.text()).to.include("Account not found");
    }
});

// Checks if API headers are correct
pm.test("API Headers are correct", function () {
    const contentType = pm.response.headers.get('Content-Type');
    pm.expect(contentType).to.satisfy(type => 
        type.includes('application/json') || type.includes('text/plain')
    );
});


// Checks if API payload is within accepted limits
pm.test("Response payload is within accepted limits", function () {
    pm.expect(pm.response.text().length).to.be.below(1024);
});

// Checks if API URL is correct
pm.test("API URL is correct", function () {
    const expectedUrl = `${pm.environment.get('baseUrl')}/api/Account/UpdateAccount/${pm.environment.get('accountId')}`;
    pm.expect(pm.request.url.toString()).to.eql(expectedUrl);
});
