//status code 400
pm.test("Response expect to have status code 400", function(){
    pm.expect(pm.response.to.have.status(400));
});

//expects to have error message
pm.test("Error message exist", function(){
    pm.expect(pm.response.text()).to.not.be.empty;
});
