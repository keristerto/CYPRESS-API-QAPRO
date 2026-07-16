
describe("Criar Reserva Test Suite", () => {

    it("criar reserva com sucesso", function () {
        cy.request({
          method: "POST",
          url: "/booking",
          body: {
            firstname: "QA",
            lastname: "Teste",
            totalprice: 123,
            depositpaid: true,
            bookingdates: {
              checkin: "2026-07-16",
              checkout: "2026-07-20",
            },
            additionalneeds: "Breakfast",
          },
          failOnStatusCode: false,
        }).then((resultado) => {
          expect(resultado.status).to.equal(200);
        });
      });
  });
