//Expecting a 400 for duplicated username

//status code
pm.test("Response statuse code is 400", function(){
    pm.response.to.have.status(400);
});

const jsonData = pm.response.text();

//check the error message in the response
pm.test("Error message is present", function(){
    pm.expect(pm.response.text()).to.not.be.empty;
});

