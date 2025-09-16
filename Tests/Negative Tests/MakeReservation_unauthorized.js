//unauthorize 
pm.test("Response status code is 401", function(){
    pm.response.to.have.status(401);
});
