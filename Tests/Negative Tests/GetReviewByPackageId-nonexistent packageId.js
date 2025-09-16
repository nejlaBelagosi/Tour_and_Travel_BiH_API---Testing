//API: Get review by non-existent tourPackageId

pm.test("Status code is 400 or 404", function () {
    pm.expect(pm.response.code).to.be.oneOf([400,404]);
});
