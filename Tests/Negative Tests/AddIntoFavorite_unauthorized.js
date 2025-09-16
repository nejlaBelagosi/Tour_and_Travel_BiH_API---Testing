//expect status 401
pm.test("Response status to be 401", function(){
    pm.expect(pm.response).to.have.status(401);
})
