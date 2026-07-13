describe ("Login Test Suite", () => {
    it("Login com sucesso", () => {
        cy.request({
            method: "POST", 
            url:"https://restful-booker.herokuapp.com/auth", 
            body: {
                username: "admin",
                password: "password123"
            }
        
        
        }).then((resultado) => {
            expect(resultado.status).to.eq(200);
            expect(resultado.body.token).to.not.be.empty;
        })

     })
    });