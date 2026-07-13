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
        });
    });

    it("Login com falha", () => {
        cy.request({
            method: "POST", 
            url:"https://restful-booker.herokuapp.com/auth", 
            body: {
                username: "admin",
                password: "wrongpassword"
            }
        
        
        }).then((resultado) => {
            expect(resultado.status).to.eq(200);
            expect(resultado.body.reason).to.eq("Bad credentials");
        });
    });

     it("Login com usuário inválido", () => {
        cy.request({
            method: "POST", 
            url:"https://restful-booker.herokuapp.com/auth", 
            body: {
                username: "invalidUser",
                password: "password123"
            }
        
        
        }).then((resultado) => {
            expect(resultado.status).to.eq(200);
            expect(resultado.body.reason).to.eq("Bad credentials");
        });
    });

     it("Login com usuário inválido e senha inválida", () => {
        cy.request({
            method: "POST", 
            url:"https://restful-booker.herokuapp.com/auth", 
            body: {
                username: "invalidUser",
                password: "wrongpassword"
            }
        
        
        }).then((resultado) => {
            expect(resultado.status).to.eq(200);
            expect(resultado.body.reason).to.eq("Bad credentials");
        });
    });

   it("Login com usuário inválido e senha vazios", () => {
        cy.request({
            method: "POST", 
            url:"https://restful-booker.herokuapp.com/auth", 
            body: {
                username: "",
                password: ""
            }
        
        
        }).then((resultado) => {
            expect(resultado.status).to.eq(200);
            expect(resultado.body.reason).to.eq("Bad credentials");
        });
    });

});