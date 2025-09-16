//unauthorized
pm.test("Respon status is 401", function(){
    pm.response.to.have.status(401);
})
