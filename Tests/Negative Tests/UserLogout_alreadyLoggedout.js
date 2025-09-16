// Already logged out or missing token
pm.test("Status code is 404 or 400", () => {
    pm.expect([400,404]).to.include(pm.response.code);
});
pm.test("Response indicates token not found or already logged out", () => {
    const responseText = pm.response.text();
    pm.expect(responseText.toLowerCase()).to.include.oneOf(["not found", "logout"]);
});
