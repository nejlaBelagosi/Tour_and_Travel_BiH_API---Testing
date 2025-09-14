const requestBody = pm.request.body.raw;
const requestData = JSON.parse(requestBody);
const jsonData = pm.response.json();

// Store accountId from newAccount
if (jsonData.newAccount && jsonData.newAccount.accountId) {
    pm.environment.set("accountId", jsonData.newAccount.accountId);
    console.log("accountId stored from newAccount:", jsonData.newAccount.accountId);
}

// Store username 
if (jsonData.newAccount && jsonData.newAccount.username){
    pm.environment.set("username", jsonData.newAccount.username);
    console.log("username stored from newAccount", jsonData.newAccount.username);
}

//store user password
if (jsonData.newAccount && jsonData.newAccount.userPassword){
    pm.environment.set("userPassword", jsonData.newAccount.userPassword);
    console.log("User password stored from newAccount", jsonData.newAccount.userPassword);
}

//checks API status
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

//checks JSON response
pm.test("Response is JSON", function () {
    pm.expect(pm.response.json()).to.not.be.null;
});

//checks if API response headers are valid
pm.test("check if API response headers are valid", function () {
    pm.expect(pm.response.headers.get("Content-type")).to.include("application/json");
});

//check if API respons time is below 500ms
pm.test("Response time is below 500ms", function(){
    pm.expect(pm.response.responseTime).to.be.below(500);
});

//checks if API method is Valid
pm.test("API method is valid", function(){
    pm.expect(pm.request.method).to.eql("POST");
});

//checks if API endpoint URL is valid
pm.test("URL Endpoint is valid", function(){
    const baseUrl = pm.variables.get("baseUrl");
    pm.expect(pm.request.url.toString()).to.eql(`${baseUrl}/api/Users/RegisterUser`);
});

//checks required fields
pm.test("Response contains required user properties", function() {
    pm.expect(jsonData).to.have.property("newUser");
    pm.expect(jsonData).to.have.property("newAccount");

    const newUser = jsonData.newUser;
    const newAccount = jsonData.newAccount;

    pm.expect(newUser).to.have.property("name");
    pm.expect(newUser).to.have.property("surname");
    pm.expect(newUser).to.have.property("address");
    pm.expect(newUser).to.have.property("dateOfBirth");
    pm.expect(newUser).to.have.property("contact");
    pm.expect(newUser).to.have.property("email");

    pm.expect(newAccount).to.have.property("accountTypeId");
    pm.expect(newAccount).to.have.property("username");
    pm.expect(newAccount).to.have.property("userPassword");
    pm.expect(newAccount).to.have.property("userImage");
});

//checks are fields valid
pm.test("Response fields match request data", function() {
    const newUser = jsonData.newUser;
    const newAccount = jsonData.newAccount;

    pm.expect(newUser.email).to.eql(requestData.email);
    pm.expect(newUser.contact).to.eql(requestData.contact);
    pm.expect(newAccount.userImage).to.eql(requestData.userImage);
});

//checks email format
pm.test("Email format is valid", function() {
    const newUser = jsonData.newUser;
    pm.expect(newUser.email).to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
});
//checks if picture format valid
pm.test("Picture format is valid", function() {
    const newAccount = jsonData.newAccount;
    pm.expect(newAccount.userImage).to.match(/\w+\.(jpg|png)$/i);
});
//checks if API payload size is within accepted limits 1024
pm.test("API payload is within acceptable size", function(){
    pm.expect(pm.request.body.raw.length).to.be.below(1024);
});

