
describe("Deletar Reserva Test Suite", () => {
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
        password: "password123",
      },
    }).then((resultado) => {
      expect(resultado.body.token).to.not.be.empty;
      token = resultado.body.token;
    });
  });

  it("Deletar reserva com sucesso", function () {
      criarReserva().then((reservaCriada) => {
        expect(reservaCriada.status).to.equal(200);
        const bookingId = reservaCriada.body.bookingid;

        cy.request({
          method: "DELETE",
          url: `/booking/${bookingId}`,
          headers: {
            Cookie: `token=${token}`,
          },
          failOnStatusCode: false,
        }).then((resultado) => {
          expect(resultado.status).to.equal(201);
        });
      });
  });

  it("Deletar reserva sem login", () => {
    criarReserva().then((reservaCriada) => {
      expect(reservaCriada.status).to.equal(200);
      const bookingId = reservaCriada.body.bookingid;

      cy.request({
        method: "DELETE",
        url: `/booking/${bookingId}`,
        failOnStatusCode: false,
      }).then((resultado) => {
        expect(resultado.status).to.equal(403);
      });
    });
  });
});