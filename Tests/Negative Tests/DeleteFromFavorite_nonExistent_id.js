pm.test("Status code is 404 Not Found", () => {
    pm.response.to.have.status(404);
});

pm.test("Response indicates favorite item not found", () => {
    const responseText = pm.response.text();
    pm.expect(responseText.toLowerCase()).to.include.oneOf(["not found", "does not exist"]);
});
