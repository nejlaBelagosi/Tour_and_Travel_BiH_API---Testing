// reservation status is not "zavrseno"
pm.test("Response status 400", function(){
    pm.response.to.have.status(400);
});
