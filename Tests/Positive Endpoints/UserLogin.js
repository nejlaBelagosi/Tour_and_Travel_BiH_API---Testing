//authorization token automaticaly added to the environment variable
const jsonData = pm.response.json();

// checks if response has token value
if (jsonData.token) {
    pm.environment.set("enduserToken", jsonData.token);
    console.log("User token set: " + jsonData.token);
} else {
    console.log("Token not found in response!");
}

//store userId after login
if(jsonData.user && jsonData.user.userId){
    pm.environment.set("endUserId", jsonData.user.userId);
}

//store accountId
if(jsonData.user && jsonData.user.accountId){
    pm.environment.set("accountId", jsonData.user.accountId);
}

//checks response status
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Are API response headers valid
pm.test("API response header is valid", function(){
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

// Token is not empty
pm.test("Token is not empty", function(){
    pm.expect(pm.response.json().token).not.to.be.empty;
})

// response has token
pm.test("Response has token", function(){
    pm.expect(pm.response.json()).to.have.property("token");
    pm.expect(pm.response.json().token).to.be.a("string").and.not.empty;
});

//Response has objects
pm.test("Response has user object", function(){
    pm.expect(pm.response.json().user).to.have.property("userId");
    pm.expect(pm.response.json().user).to.have.property("name");
    pm.expect(pm.response.json().user).to.have.property("surname");
    pm.expect(pm.response.json().user).to.have.property("accountTypeId");
});

// UserId should be a positive number
pm.test("UserId is a positive number", function () {
    pm.expect(jsonData.user.userId).to.be.a("number");
    pm.expect(jsonData.user.userId).to.be.above(0);
});

// Error handling if token is missing
if (!jsonData.token) {
    console.error("Token not found in response!");
    pm.test("Token missing error", function () {
        throw new Error("Token not found in response");
    });
}
