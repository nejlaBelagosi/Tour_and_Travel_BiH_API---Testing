pm.test("Response is JSON", function () {
    pm.expect(pm.response.json());
});

const jsonData = pm.response.json();

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("packageId matches request", function () {
    const requestBody = pm.request.body ? JSON.parse(pm.request.body.raw) : {};
    const jsonData = pm.response.json();
    pm.expect(jsonData.packageId).to.eql(requestBody.packageId);
});

//store favoriteItemId after adding it
if(jsonData && jsonData.favoriteItemId){
    pm.environment.set("favoriteItemId", jsonData.favoriteItemId);
}
