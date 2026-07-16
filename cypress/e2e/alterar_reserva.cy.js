
describe("Alterar Reserva Test Suite", () => {
let token = "";

  const criarReserva = () => {
    return cy.request({
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
    });
  };

    beforeEach(() => {
        cy.request({
            method: "POST",
            url: "/auth",
            body: {
                username: "admin",
                password: "password123"
            }
        }).then((resultado) => {
            expect(resultado.body.token).to.not.be.empty;
            token = resultado.body.token;
        });
    });
it("Alterar reserva com sucesso", function () {
      criarReserva().then((reservaCriada) => {
        expect(reservaCriada.status).to.equal(200);
        const bookingId = reservaCriada.body.bookingid;

        cy.request({
          method: "PUT",
          url: `/booking/${bookingId}`,
          headers: {
            Cookie: `token=${token}`,
          },
          body: {
            firstname: "QA",
            lastname: "Testealtea",
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
});
